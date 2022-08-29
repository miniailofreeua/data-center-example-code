import { connect } from 'react-redux';
import { Formik } from 'formik';
import { useMemo } from 'react';
import BrandUpdateApiForm from './BrandUpdateApiForm';
import getValidationSchema from './brandUpdateApiFormValidationSchema';
import { initialKeyToColumnMappings, initialQueryParams } from './constants';

const BrandUpdateApiFormContainer = ({
  initialValues,
  onFormSubmit,
  onFormClose,
  isEdit,
  loading,
}) => {
  const onSubmit = (form) => {
    const { keyToColumnMappings, queryParams } = form;
    const keyToColumnMappingsWithoutEmptyRows = keyToColumnMappings.filter(
      (v) => v.key && v.columnName,
    );
    const queryParamsWithoutEmptyRows = queryParams.filter(
      (v) => v.key && v.value,
    );

    const payload = {
      ...form,
      keyToColumnMappings: keyToColumnMappingsWithoutEmptyRows,
      queryParams: queryParamsWithoutEmptyRows,
    };

    onFormSubmit && onFormSubmit(payload);
    onFormClose && onFormClose();
  };

  const validationSchema = useMemo(() => getValidationSchema({}), []);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values }) => (
        <>
          <BrandUpdateApiForm
            values={values}
            isEdit={isEdit}
            loading={loading}
            initialValues={initialValues}
            errors={errors}
            touched={touched}
          />
        </>
      )}
    </Formik>
  );
};

function mapStateToProps(state, props) {
  const { brandUpdateApi } = props;

  const {
    id,
    name,
    domain,
    apiUrl,
    runEverySeconds,
    queryParams,
    keyToColumnMappings,
  } = brandUpdateApi || {};

  const initialValues = {
    id: id || undefined,
    name: name || undefined,
    domain: domain || undefined,
    apiUrl: apiUrl || undefined,
    runEverySeconds: runEverySeconds || undefined,
    queryParams: queryParams || initialQueryParams,
    keyToColumnMappings: keyToColumnMappings || initialKeyToColumnMappings,
  };

  return {
    initialValues,
    isEdit: props.isEdit,
  };
}

export default connect(mapStateToProps)(BrandUpdateApiFormContainer);
