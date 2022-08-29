import * as Yup from 'yup';

const getValidationSchema = () =>
  Yup.object().shape({
    brandId: Yup.string().required('Desk is required'),
  });

export default getValidationSchema;
