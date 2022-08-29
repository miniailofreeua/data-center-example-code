import * as Yup from 'yup';

const getValidationSchema = () => {
  return Yup.object().shape({
    companyId: Yup.string().required('Company is required'),
  });
};

export default getValidationSchema;
