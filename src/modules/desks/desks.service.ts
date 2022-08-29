import { ILike } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateDeskDto, UpdateDeskDto } from './dtos/desk.dto';
import { IDeskCreate } from './interfaces/desk.interface';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';

import { DeskEntity } from './desks.entity';
import { DesksRepository } from './desks.repository';

@Injectable()
export class DesksService {
  create: any;
  constructor(
    @InjectRepository(DesksRepository)
    private readonly _desksRepository: DesksRepository,
  ) {}

  async createOne(payload: IDeskCreate): Promise<Error | DeskEntity> {
    const savedDesk = await this._desksRepository.createAndReturn(payload);
    return savedDesk;
  }

  async checkIfExistAndCreate(
    desk: CreateDeskDto,
    req: IRequest,
  ): Promise<Error | DeskEntity> {
    const payload = {
      ...desk,
      createdBy: req.user.id,
    };

    const duplicate = await this._desksRepository.findOne({
      name: ILike(payload.name),
    });

    if (duplicate) {
      return Error(`This Desk is already exists`);
    }

    const savedDesk = await this.createOne(payload);
    return savedDesk;
  }

  async getList(
    query: any,
  ): Promise<Error | { list: DeskEntity[]; count: number }> {
    const {
      take = 15,
      skip = 0,
      searchText,
      selectedId,
      notInIds = [],
      inBrands = [],
      inDesks = [],
    } = query;

    const notIn = [
      selectedId,
      ...(notInIds && !Array.isArray(notInIds) ? [notInIds] : notInIds),
    ]
      .filter((o) => o)
      .map(Number);

    const mappedInBrands = [
      ...(inBrands && !Array.isArray(inBrands) ? [inBrands] : inBrands),
    ]
      .filter((o) => o)
      .map(Number);

    const mappedInDesks = [
      ...(inDesks && !Array.isArray(inDesks) ? [inDesks] : inDesks),
    ]
      .filter((o) => o)
      .map(Number);

    const desksQuery = this._desksRepository
      .createQueryBuilder('desks')
      .leftJoinAndSelect('desks.createdBy', 'createdBy')
      .leftJoinAndSelect('desks.brand', 'brand')
      .where('desks."name" iLIKE :searchText', {
        searchText: `%${searchText ? searchText : ''}%`,
      });

    if (notIn.length > 0) {
      desksQuery.andWhere('desks."id" not in (:...notIn)', {
        notIn,
      });
    }

    if (mappedInBrands.length > 0) {
      desksQuery.andWhere('desks."brandId" in (:...mappedInBrands)', {
        mappedInBrands,
      });
    }

    if (mappedInDesks.length > 0) {
      desksQuery.andWhere('desks."id" in (:...mappedInDesks)', {
        mappedInDesks,
      });
    }

    const res = await desksQuery
      .orderBy({ 'desks.createdAt': 'DESC' })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const [list, count] = res;

    if (selectedId) {
      const selectedDesk = await this._desksRepository.findOne(selectedId);
      if (selectedDesk) {
        list.push(selectedDesk);
      }
    }

    return { list, count };
  }

  async updateDesk(
    deskId: number,
    payload: UpdateDeskDto,
  ): Promise<Error | DeskEntity> {
    return this._desksRepository.updateEntity(deskId, payload);
  }

  async getDesk(deskId: number): Promise<DeskEntity> {
    const desk = await this._desksRepository.findOne(deskId, {
      relations: ['brand'],
    });

    return desk;
  }
}
