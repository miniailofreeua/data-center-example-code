import { Repository, EntityRepository } from 'typeorm';
import { CreateTraderDto } from './dto/create-trader.dto';
import { TraderEntity } from './traders.entity';

export interface IEntity extends TraderEntity {
  id: number;
}
@EntityRepository(TraderEntity)
class TradersRepository extends Repository<TraderEntity> {
  async createOrUpdate(trader: CreateTraderDto): Promise<TraderEntity> {
    const entities = await this.save(trader);
    return entities;
  }

  static async bulkCreateOrUpdateStatic(payload) {
    if (!payload || payload.length === 0) {
      return null;
    }
    const entities = await TraderEntity.save(payload);
    return entities;
  }

  async createEntities(traders: CreateTraderDto[]): Promise<TraderEntity[]> {
    const entities = await this.save(traders);
    return entities;
  }

  async bulkCreate(payload: Partial<TraderEntity[]>): Promise<IEntity[]> {
    const entities = await this.save(payload);
    return entities;
  }

  async findByQuery(query: any): Promise<any> {
    const entities = await this.findOne({
      where: query,
    });
    return entities;
  }

  async findManyByQuery(query: any): Promise<any> {
    const entities = await this.find({
      where: query,
    });
    return entities;
  }

  async findMany(query: any): Promise<any> {
    const entities = await this.find(query);
    return entities;
  }
}

export { TradersRepository };
