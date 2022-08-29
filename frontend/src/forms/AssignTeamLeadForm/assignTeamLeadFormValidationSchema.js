import * as Yup from 'yup';

const getValidationSchema = () =>
  Yup.object().shape({
    teamLeadId: Yup.string().nullable().required('TeamLead is required'),
  });

export default getValidationSchema;
