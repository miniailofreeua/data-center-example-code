import { Connection } from 'typeorm';
import { UserEntity } from '../users.entity';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UserBrandEntity } from 'src/modules/userBrands/userBrands.entity';
import { validateUserBrandsPayload } from './validateUserBrandsPayload';
import { BadRequestException } from '@nestjs/common';

export const cascadeUpdateUserBrands = async (
  user: UserEntity,
  payload: PartialUpdateUserDto,
  connection: Connection,
  _userBrandsRepository,
) => {
  const { id: userId, userBrands } = user;
  if (!payload.userBrands || !Array.isArray(payload.userBrands)) {
    throw new BadRequestException('Provide assigned Team Leads list');
  }
  validateUserBrandsPayload(payload.userBrands, payload.role);

  const userBrandIdsToRemoveFromDb = [];
  const userBrandsToCreate = [];
  payload.userBrands.forEach((userBrand) => {
    const { brandId } = userBrand;
    const isExist = userBrands.find((ud) => brandId === ud.brandId);
    if (!isExist && brandId) {
      userBrandsToCreate.push({
        brandId,
        userId,
      });
    }
  });
  userBrands.forEach((userBrand) => {
    const isToDeleted = !payload.userBrands.some(
      (ud) => userBrand.brandId === ud.brandId,
    );
    if (isToDeleted) {
      userBrandIdsToRemoveFromDb.push(userBrand);
    }
  });
  if (userBrandIdsToRemoveFromDb.length > 0) {
    const res = await _userBrandsRepository.delete(userBrandIdsToRemoveFromDb);
  }

  const queryRunner = connection.createQueryRunner();
  await queryRunner.manager.insert(UserBrandEntity, userBrandsToCreate);
};
