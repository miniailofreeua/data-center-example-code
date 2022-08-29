import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { DeskEntity } from './desks.entity';
import { ICreateDesk } from './interfaces';

@EntityRepository(DeskEntity)
class DesksRepository extends Repository<DeskEntity> {
  async createAndReturn(payload: Partial<DeskEntity>): Promise<DeskEntity> {
    const obj = Object.assign(this.create(), payload);
    const entity = await this.save(obj);
    return entity;
  }

  async findByQuery(query): Promise<DeskEntity> {
    const entity = await this.findOne({
      where: query,
      order: {
        id: 'DESC',
      },
      relations: ['brand'],
    });
    return entity;
  }

  async updateEntity(
    id: number,
    payload: Partial<ICreateDesk>,
  ): Promise<DeskEntity | Error> {
    const desk = await this.findOne(id);
    if (!desk) {
      return new NotFoundException('Desk to update was not found');
    }
    const obj = Object.assign(desk, payload);
    const entity = await this.save(obj);
    return entity;
  }
}

export { DesksRepository };
