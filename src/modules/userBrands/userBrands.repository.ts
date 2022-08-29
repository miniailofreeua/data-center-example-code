import { Repository, EntityRepository } from 'typeorm';
import { UserBrandEntity } from './userBrands.entity';

export interface IProps {
  traderId: number;
  brandId: number;
  crmUserId: number;
  ftdDate: string | null;
  registeredAt: string | null;
  lastLoginAt: string | null;
  lastDepositDate: string | null;
}

@EntityRepository(UserBrandEntity)
class UserBrandsRepository extends Repository<UserBrandEntity> {
  async bulkCreate(payload: UserBrandEntity[]): Promise<any> {
    const entity = await this.save(payload);
    return entity;
  }
}

export { UserBrandsRepository };
