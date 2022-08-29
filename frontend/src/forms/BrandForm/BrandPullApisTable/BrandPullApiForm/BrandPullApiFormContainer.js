import { connect } from 'react-redux';
import { Formik } from 'formik';
import { useMemo } from 'react';
import BrandPullApiForm from './BrandPullApiForm';
import getValidationSchema from './brandPullApiFormValidationSchema';
import { initialKeyToColumnMappings, initialQueryParams } from './constants';

const BrandPullApiFormContainer = ({
  initialValues,
  onFormSubmit,
  onFormClose,
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
      {({ values }) => (
        <>
          <BrandPullApiForm values={values} initialValues={initialValues} />
        </>
      )}
    </Formik>
  );
};

function mapStateToProps(state, props) {
  const { brandPullApi, isEdit } = props;

  const {
    id,
    name,
    domain,
    apiUrl,
    runEverySeconds,
    queryParams,
    keyToColumnMappings,
  } = brandPullApi || {};

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
    isEdit,
  };
}

export default connect(mapStateToProps)(BrandPullApiFormContainer);
