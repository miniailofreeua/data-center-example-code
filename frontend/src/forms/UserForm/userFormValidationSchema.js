import * as Yup from 'yup';
import { UserRole } from '../../enums';

const getValidationSchema = (isEdit, userRole) => {
  return Yup.object().shape({
    firstName: Yup.string().nullable().required('First name is required'),
    lastName: Yup.string().nullable().required('Last name is required'),
    username: Yup.string().nullable().required('Username is required'),
    role: Yup.string().nullable().required('Role is required'),
    password: Yup.string()
      .nullable()
      .min(8, 'Password must be at least 8 characters')
      .when('role', {
        is: (role) => {
          return role !== UserRole.Agent && !isEdit;
        },
        then: Yup.string().nullable().required('Password is required'),
      }),

    teamLeadId: Yup.number()
      .nullable()
      .when('role', {
        is: (role) => {
          return (
            role === UserRole.Agent &&
            [UserRole.CrmManager, UserRole.DeskManager].includes(userRole)
          );
        },
        then: Yup.number().nullable().required('Please select teamLeadId'),
      }),

    userTeamLeads: Yup.array().when('role', {
      is: (role) => {
        return [UserRole.CrmManager, UserRole.DeskManager].includes(role);
      },
      then: Yup.array()
        .min(1, 'Please assign at least one TeamLead')
        .required('Please select TeamLead'),
    }),

    userBrands: Yup.array().when('role', {
      is: (role) => {
        return [UserRole.Company].includes(role);
      },
      then: Yup.array()
        .min(1, 'Please assign at least one Brand')
        .required('Please select Brand'),
    }),

    deskId: Yup.number()
      .nullable()
      .when('role', {
        is: (role) => {
          return [UserRole.Agent].includes(role);
        },
        then: Yup.number().nullable().required('Desk is required'),
      }),

    userDesks: Yup.array().when('role', {
      is: (role) => {
        return ![UserRole.Agent, UserRole.SuperManager].includes(role);
      },
      then: Yup.array()
        .min(1, 'Please assign at least one Desk')
        .required('Please select Desk'),
    }),
  });
};

export default getValidationSchema;
