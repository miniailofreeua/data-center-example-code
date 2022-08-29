import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { BadRequestException } from '@nestjs/common';
import { ICreateUserDesksPayload } from '../interfaces/user-desks.interface';

export const validateUserDesksPayload = (
  userDesksPayload: ICreateUserDesksPayload[],
  rolePayload: UserRole,
) => {
  if (rolePayload === UserRole.CrmManager) {
    // TODO: crm-manager task
    // if (!userDesksPayload.length) {
    //   throw new BadRequestException('Please select Desk(s) for Crm Manger');
    // }
  }
  if (rolePayload === UserRole.TeamLead) {
    if (!userDesksPayload.length) {
      throw new BadRequestException('Please select Desk for Team Lead');
    }
    if (userDesksPayload.length > 1) {
      throw new BadRequestException(
        'Only one Desk can be assigned to Team Lead',
      );
    }
  }
};
