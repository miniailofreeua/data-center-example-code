import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { ILike, In } from 'typeorm';

export const getUsersOptionsFromQuery = (query: any, currentUser: any) => {
  const { searchText, role: searchRole } = query;
  const { id, role, companyId, desks, userTeamLeads } = currentUser;

  const whereOptions = {} as any;

  const relations = [
    'createdBy',

    'teamLead',
    'userTeamLeads',
    'userTeamLeads.teamLead',

    'brand',
    'userBrands',
    'userBrands.brand',

    'desks',
    'userDesk',
    'userDesks',
    'userDesks.desk',
    'userDesks.desk.brand',

    'company',
  ];

  if (
    ![UserRole.Admin, UserRole.SuperManager, UserRole.Company].includes(role)
  ) {
    whereOptions.companyId = companyId;
  }

  if (role === UserRole.Company) {
    whereOptions.companyId = id;
  }

  if (role === UserRole.CrmManager) {
    whereOptions.role = In([
      UserRole.TeamLead,
      UserRole.Agent,
      UserRole.DeskManager,
    ]);
  }

  if (role === UserRole.DeskManager) {
    whereOptions.role = In([UserRole.TeamLead, UserRole.Agent]);
  }

  if ([UserRole.DeskManager, UserRole.CrmManager].includes(role)) {
    whereOptions.userDesk = {
      deskId: In(desks.map(({ id }) => id)),
    };
  }

  if (role === UserRole.TeamLead) {
    whereOptions.teamLeadId = id;
    whereOptions.role = UserRole.Agent;
  }

  if (searchRole) {
    whereOptions.role = searchRole;
  }

  const orConditions = [];

  if (searchText) {
    const orCondition1 = {
      ...whereOptions,
      ...(searchText && { firstName: ILike(`%${searchText}%`) }),
    };
    const orCondition2 = {
      ...whereOptions,
      ...(searchText && { lastName: ILike(`%${searchText}%`) }),
    };
    orConditions.push(orCondition1, orCondition2);
  }

  const where = (qb) => {
    qb.where(whereOptions);

    if ([UserRole.DeskManager, UserRole.CrmManager].includes(role)) {
      qb.andWhere(
        `
          users.id IN(:...ids) 
            OR
          users."teamLeadId" IN(:...ids)
            ${
              [UserRole.CrmManager].includes(role)
                ? `OR (users.role= 'deskManager' AND users."companyId"= ${companyId})`
                : ''
            }
        `,
        {
          ids: userTeamLeads.map(({ teamLeadId }) => teamLeadId),
        },
      );
    }
  };

  const join = {
    alias: 'users',
  };

  return {
    join,
    where,
    relations,
    orConditions,
  };
};
