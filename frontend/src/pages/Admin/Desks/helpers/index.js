import { UserRole } from '../../../../enums/UserRole.enum';

export const getActions = (userRole) =>
  [
    {
      name: 'Create desk',
      link: 'desks/create',
      show: userRole === UserRole.Admin,
    },
  ].filter(({ show }) => show);
