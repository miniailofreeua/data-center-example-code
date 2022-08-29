import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBrandsRepository } from './userBrands.repository';

@Injectable()
export class UserBrandsService {
  constructor(
    @InjectRepository(UserBrandsRepository)
    private readonly _UserBrandsRepository: UserBrandsRepository,
  ) {}

  public async createUserBrands({ mappedFilteredUserBrands }): Promise<any> {
    const savedUserBrands = await this._UserBrandsRepository.bulkCreate(
      mappedFilteredUserBrands,
    );
    return savedUserBrands;
  }
}
