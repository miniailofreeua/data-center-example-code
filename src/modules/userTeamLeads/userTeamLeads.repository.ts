import { Repository, EntityRepository } from 'typeorm';
import { UserTeamLeadEntity } from './userTeamLeads.entity';

@EntityRepository(UserTeamLeadEntity)
class UserTeamLeadsRepository extends Repository<UserTeamLeadEntity> {
  async createAndReturn(
    payload: Partial<UserTeamLeadEntity>,
  ): Promise<UserTeamLeadEntity> {
    const obj = Object.assign(this.create(), payload);
    const entity = await this.save(obj);
    return entity;
  }

  async findByQuery(query): Promise<UserTeamLeadEntity> {
    const entity = await this.findOne({
      where: query,
    });
    return entity;
  }
}

export { UserTeamLeadsRepository };
