import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { BadRequestException } from '@nestjs/common';
import { ICreateUserBrandsPayload } from '../interfaces/user-brands.interface';

export const validateUserBrandsPayload = (
  userBrandPayloads: ICreateUserBrandsPayload[],
  rolePayload: UserRole,
) => {
  if (rolePayload === UserRole.Company && userBrandPayloads.length === 0) {
    throw new BadRequestException('Please assign at least one Brand');
  }
};
