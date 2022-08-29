import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, DeepPartial } from 'typeorm';
import { UpdateTraderToBrandDto } from './dto/update-traderToBrand.dto';
import ITraderToBrand from './interfaces/traderToBands.interface';
import { TraderToBrandEntity } from './tradersToBrands.entity';

export interface IProps {
  traderId: number;
  brandId: number;
  crmUserId: number;
  ftdDate: string | null;
  registeredAt: string | null;
  lastLoginAt: string | null;
  lastDepositDate: string | null;
}
@EntityRepository(TraderToBrandEntity)
class TradersToBrandsRepository extends Repository<TraderToBrandEntity> {
  async bulkUpdate(payload: DeepPartial<TraderToBrandEntity[]>): Promise<any> {
    if (!payload || payload.length === 0) {
      return null;
    }
    const entities = await this.save(payload);
    return entities;
  }

  static async bulkCreateOrUpdateStatic(payload) {
    if (!payload || payload.length === 0) {
      return null;
    }
    const entities = await TraderToBrandEntity.save(payload);
    return entities;
  }

  async bulkCreate(payload: DeepPartial<TraderToBrandEntity[]>) {
    const entities = await this.save(payload);
    return entities;
  }

  async findByQuery(query) {
    const entities = await this.find({
      ...query,
      relations: ['brand', 'trader'],
    });
    return entities;
  }
  async findWithWhere(where) {
    const entities = await this.find({
      where,
      relations: ['brand', 'trader'],
    });
    return entities;
  }

  static async findStatic(options) {
    const entities = await TraderToBrandEntity.find(options);
    return entities;
  }

  async updateEntity(
    id: number,
    payload: Partial<UpdateTraderToBrandDto>,
  ): Promise<TraderToBrandEntity | Error> {
    const trader = await this.findOne(id);

    if (!trader) {
      return new NotFoundException('Trader to update was not found');
    }

    const obj = Object.assign(trader, payload);

    const entity = await this.save(obj);

    return entity;
  }
}

export { TradersToBrandsRepository };
