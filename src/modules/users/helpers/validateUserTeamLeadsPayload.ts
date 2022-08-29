import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { BadRequestException } from '@nestjs/common';
import { ICreateUserTeamLeadsPayload } from '../interfaces/user-team-leads.interface';

export const validateUserTeamLeadsPayload = (
  userTeamLeadPayloads: ICreateUserTeamLeadsPayload[],
  rolePayload: UserRole,
) => {
  if (
    [UserRole.CrmManager, UserRole.Admin].includes(rolePayload) &&
    userTeamLeadPayloads.length === 0
  ) {
    throw new BadRequestException('Please assign at least one Team Lead');
  }
};
