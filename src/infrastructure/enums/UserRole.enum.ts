export enum UserRole {
  Admin = 'admin',
  SuperManager = 'superManager',
  Company = 'company',
  CrmManager = 'crmManager',
  DeskManager = 'deskManager',
  TeamLead = 'teamLead',
  Agent = 'agent',
}

export const UserRoleLabel = {
  [UserRole.Admin]: 'Admin',
  [UserRole.SuperManager]: 'Super Manager',
  [UserRole.Company]: 'Company',
  [UserRole.CrmManager]: 'CRM Manager',
  [UserRole.DeskManager]: 'Desk Manager',
  [UserRole.TeamLead]: 'Team Lead',
  [UserRole.Agent]: 'Agent',
};

export const UserRoleListOptions = Object.entries(UserRoleLabel).map(
  ([departmentKey, departmentLabel]) => ({
    value: departmentKey,
    label: departmentLabel,
  }),
);
