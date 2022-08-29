import * as Yup from 'yup';
import { UserRole } from '../../../enums';

const getValidationSchema = (userRole) => {
  return Yup.object().shape({
    teamLeadId: Yup.string().required('TeamLead is required'),
    agentId: Yup.string().when('role', {
      is: () => {
        return [UserRole.TeamLead].includes(userRole);
      },
      then: Yup.string().required('Agent is required'),
    }),
  });
};

export default getValidationSchema;
