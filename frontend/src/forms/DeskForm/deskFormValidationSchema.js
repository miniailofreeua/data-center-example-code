import * as Yup from 'yup';

const getValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('Name is required'),
    brandId: Yup.string().required('Brand is required'),
  });
};

export default getValidationSchema;
