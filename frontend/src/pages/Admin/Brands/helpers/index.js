import { UserRole } from '../../../../enums/UserRole.enum';

export const getActions = (userRole) =>
  [
    {
      name: 'Create brand',
      link: 'brands/create',
      show: userRole === UserRole.Admin,
    },
  ].filter(({ show }) => show);
