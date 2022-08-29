import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTraderToBrandDto } from './dto/update-traderToBrand.dto';
import { DeepPartial } from 'typeorm';
import ITraderToBrand from './interfaces/traderToBands.interface';
import { TraderToBrandEntity } from './tradersToBrands.entity';
import { TradersToBrandsRepository } from './tradersToBrands.repository';

@Injectable()
export class TradersToBrandsService {
  constructor(
    @InjectRepository(TradersToBrandsRepository)
    private readonly _tradersToBrandsRepository: TradersToBrandsRepository,
  ) {}

  public async createTraderToBrandsBulk(
    traderToBrands: DeepPartial<TraderToBrandEntity[]>,
  ) {
    const savedTraderToBrands =
      await this._tradersToBrandsRepository.bulkCreate(traderToBrands);
    return savedTraderToBrands;
  }

  public async createTraderToBrandRelation(traderToBrands: ITraderToBrand) {
    const data = await this._tradersToBrandsRepository.create();
    const res = await this._tradersToBrandsRepository.save(
      Object.assign(data, traderToBrands),
    );
    return res;
  }

  async findLastRecord(where): Promise<TraderToBrandEntity> {
    return this._tradersToBrandsRepository.findOne({
      order: { crmTraderId: 'DESC' },
      where,
      relations: ['brand'],
    });
  }

  async findAndCount(
    take,
    skip,
    where?,
    relations?,
  ): Promise<{
    list: TraderToBrandEntity[];
    count: number;
  }> {
    const [result, total] = await this._tradersToBrandsRepository.findAndCount({
      order: { id: 'DESC' },
      take: take,
      skip: skip,
      ...(where && { where }),
      ...(relations && { relations }),
    });

    return {
      list: result,
      count: total,
    };
  }

  async findByQuery(query): Promise<TraderToBrandEntity[]> {
    return await this._tradersToBrandsRepository.findByQuery(query);
  }

  async findOne(params): Promise<TraderToBrandEntity> {
    return await this._tradersToBrandsRepository.findOne(params);
  }

  async find(where): Promise<TraderToBrandEntity[]> {
    return await this._tradersToBrandsRepository.findWithWhere(where);
  }

  async updateEntity(
    traderId: number,
    payload: UpdateTraderToBrandDto,
  ): Promise<Error | TraderToBrandEntity> {
    return this._tradersToBrandsRepository.updateEntity(traderId, payload);
  }
}
