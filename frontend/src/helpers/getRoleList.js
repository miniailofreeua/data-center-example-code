import { UserRole, UserRoleListOptions } from '../enums';

export const UserRoleListForAdmin = UserRoleListOptions.filter(
  ({ value }) => value === UserRole.Company || value === UserRole.SuperManager,
);

export const UserRoleListForSuperManager = UserRoleListOptions.filter(
  ({ value }) => value === UserRole.Company,
);

export const UserRoleListForCompany = UserRoleListOptions.filter(
  ({ value }) => value !== UserRole.Admin && value !== UserRole.Company,
);

export const UserRoleListForCrmManager = UserRoleListOptions.filter(
  ({ value }) =>
    value !== UserRole.Admin &&
    value !== UserRole.Company &&
    value !== UserRole.CrmManager,
);

export const UserRoleListForDeskManager = UserRoleListOptions.filter(
  ({ value }) =>
    value !== UserRole.Admin &&
    value !== UserRole.Company &&
    value !== UserRole.CrmManager &&
    value !== UserRole.DeskManager,
);

export const UserRoleListForTeamLead = [
  UserRoleListOptions.find(({ value }) => value === UserRole.Agent),
];
