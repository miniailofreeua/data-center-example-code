import { Repository, EntityRepository } from 'typeorm';
import { UserDeskEntity } from './userDesks.entity';

@EntityRepository(UserDeskEntity)
class UserDesksRepository extends Repository<UserDeskEntity> {
  async createAndReturn(
    payload: Partial<UserDeskEntity>,
  ): Promise<UserDeskEntity> {
    const obj = Object.assign(this.create(), payload);
    const entity = await this.save(obj);
    return entity;
  }

  async findByQuery(query): Promise<UserDeskEntity> {
    const entity = await this.findOne({
      where: query,
    });
    return entity;
  }
}

export { UserDesksRepository };
