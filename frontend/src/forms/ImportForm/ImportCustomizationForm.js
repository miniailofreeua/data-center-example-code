import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import {
  clearGetCustomFieldsState,
  createCustomFields,
  getCustomFields,
  openModal,
} from '../../store/actions';
import { FormField } from '../../components';
import config from '../../components/Modal/Modals/MessageModal/config';

import KeyToColumnMappingsContainer from '../BrandForm/components/KeyToColumnMappingsContainer';
import styles from './styles.module.scss';

const horizontalFormFields1 = () => [
  {
    id: 'keyToColumnMappings',
    name: 'keyToColumnMappings',
    className: 'form-control',
    render: KeyToColumnMappingsContainer,
  },
];

const renderFormField = ({ show, kievData, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const FormContainer = () => {
  const horizontalFields1 = useMemo(
    () => horizontalFormFields1().map(renderFormField),
    [],
  );

  const dispatch = useDispatch();
  const openShowTraderFieldsModal = () => {
    const modalConfig = {
      type: 'message',
      payload: config.showTraderFieldsModal(),
    };

    dispatch(openModal(modalConfig));
  };

  return (
    <Form className={styles.importForm} autoComplete="off">
      <div className={styles.traderFields} onClick={openShowTraderFieldsModal}>
        <span className="me-2">What fields Trader entity includes</span>
        <FontAwesomeIcon icon={faQuestionCircle} color="dodgerblue" />
      </div>
      <div className={styles.horizontalFields}>{horizontalFields1}</div>
      <button
        type="submit"
        className={classNames('btn btn-success mt-4', styles.btn)}
      >
        Save
      </button>
    </Form>
  );
};

const ImportCustomizationForm = ({ initialValues, onFormClose }) => {
  const dispatch = useDispatch();

  const onUnmount = useCallback(() => {
    dispatch(clearGetCustomFieldsState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCustomFields());
    return onUnmount;
  }, [dispatch, onUnmount]);

  const handleSubmit = ({ keyToColumnMappings }) => {
    const keyToColumnMappingsWithoutEmptyRows = keyToColumnMappings.filter(
      (v) => v.key && v.columnName,
    );

    dispatch(createCustomFields(keyToColumnMappingsWithoutEmptyRows));
    onFormClose && onFormClose();
  };

  return (
    <div className={styles.modalContainer}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => <FormContainer values={values} />}
      </Formik>
    </div>
  );
};

function mapStateToProps(state) {
  const { fields } = state.GetCustomFields;

  const initialValues = {
    keyToColumnMappings: fields || [{}],
  };

  return {
    initialValues,
  };
}

export default connect(mapStateToProps)(ImportCustomizationForm);
