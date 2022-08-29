import { Repository, EntityRepository } from 'typeorm';
import { TraderCredentialsEntity } from './traderCredentials.entity';

export interface IQuery {
  phone: string;
  email: string;
}

@EntityRepository(TraderCredentialsEntity)
class TraderCredentialsRepository extends Repository<TraderCredentialsEntity> {
  async bulkCreate(
    payload: Partial<TraderCredentialsEntity[]>,
  ): Promise<TraderCredentialsEntity[]> {
    const entities = await this.save(payload);

    return entities;
  }

  async findByQuery(query: IQuery[]): Promise<TraderCredentialsEntity[]> {
    const entities = await this.find({
      where: query,
      relations: ['brand'],
    });
    return entities;
  }
}

export { TraderCredentialsRepository };
