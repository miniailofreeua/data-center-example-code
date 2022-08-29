import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { UserEntity } from 'src/modules/users/users.entity';
import { In } from 'typeorm';

export const getTradersOptionsFromQuery = (
  currentUser: Partial<UserEntity>,
) => {
  const { id, role, desks } = currentUser;

  const whereOptions = {} as any;

  const relations = ['brand', 'trader', 'agent', 'desk', 'teamLead', 'company'];

  if ([UserRole.Company].includes(role)) {
    whereOptions.companyId = id;
  }

  if ([UserRole.DeskManager, UserRole.CrmManager].includes(role)) {
    whereOptions.deskId = In(desks.map(({ id }) => id));
  }

  if ([UserRole.TeamLead].includes(role)) {
    whereOptions.teamLeadId = id;
  }

  if ([UserRole.Agent].includes(role)) {
    whereOptions.agentId = id;
  }

  const where = (qb) => {
    qb.where(whereOptions);
  };

  return {
    where,
    relations,
  };
};
