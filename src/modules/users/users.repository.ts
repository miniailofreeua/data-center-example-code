import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './users.entity';

@EntityRepository(UserEntity)
class UsersRepository extends Repository<UserEntity> {
  async findByUsername(username: string): Promise<UserEntity> {
    const entity = await this.findOne({ username });
    return entity;
  }

  async findByUsernameWithPassword(username: string): Promise<UserEntity> {
    const entity = await this.findOne(
      { username },
      {
        select: [
          'id',
          'role',
          'firstName',
          'lastName',
          'passwordHash',
          'companyId',
          'brandId',
        ],
        relations: ['desks', 'userTeamLeads', 'userBrands'],
      },
    );
    return entity;
  }

  async createAndReturn(payload: Partial<UserEntity>): Promise<UserEntity> {
    const obj = Object.assign(this.create(), payload);
    const entity = await this.save(obj);
    return entity;
  }

  async bulkCreate(payload: Partial<UserEntity[]>): Promise<UserEntity[]> {
    const obj = Object.assign(this.create(), payload);
    const entity = await this.save(obj);
    return entity;
  }
}

export { UsersRepository };
