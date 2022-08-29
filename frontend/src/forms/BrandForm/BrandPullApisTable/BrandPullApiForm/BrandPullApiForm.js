import { Form } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import KeyToColumnMappingsContainer from '../../components/KeyToColumnMappingsContainer';
import QueryParamsContainer from '../../components/QueryParamsContainer';
import { FormField, SelectFormFieldFormik } from '../../../../components';
import { UpdateScheduleOptions } from '../../../../constants/UpdateScheduleOptions.constant';
import config from '../../../../components/Modal/Modals/MessageModal/config';
import { openModal } from '../../../../store/actions';
import CustomLink from '../../../../components/Common/CustomLink';
import styles from './styles.module.scss';
import { mandatoryPullFields } from './constants';

const formFields = ({ runEverySeconds }) => [
  {
    id: 'name',
    name: 'name',
    label: 'Name:',
    type: 'text',
    className: 'form-control',
    placeholder: 'Input API Name',
  },
  {
    id: 'domain',
    name: 'domain',
    label: 'API Domain:',
    type: 'text',
    className: 'form-control',
    placeholder: 'Input API Domain',
  },
  {
    id: 'apiUrl',
    name: 'apiUrl',
    label: 'API URL:',
    type: 'text',
    className: 'form-control',
    placeholder: 'Input API URL',
  },
  {
    id: 'runEverySeconds',
    name: 'runEverySeconds',
    label: 'Update Schedule:',
    component: SelectFormFieldFormik,
    isClearable: false,
    selectedOption: UpdateScheduleOptions.find(
      (o) => o.value === runEverySeconds,
    ),
    options: UpdateScheduleOptions,
    show: true,
    disabled: false,
  },
];

const horizontalFormFields1 = () => [
  {
    id: 'keyToColumnMappings',
    name: 'keyToColumnMappings',
    className: 'form-control',
    customClassName: 'me-2',
    render: KeyToColumnMappingsContainer,
  },
  {
    id: 'queryParams',
    name: 'queryParams',
    className: 'form-control',
    render: QueryParamsContainer,
  },
];

const renderFormField = ({ show, kievData, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const BrandPullApiForm = ({ isEdit, runEverySeconds }) => {
  const verticalFields = useMemo(
    () => formFields({ runEverySeconds }).map(renderFormField),
    [runEverySeconds],
  );

  const horizontalFields1 = useMemo(
    () => horizontalFormFields1().map(renderFormField),
    [],
  );

  const dispatch = useDispatch();
  const openShowTraderFieldsModal = () => {
    const modalConfig = {
      type: 'message',
      payload: config.showTraderFieldsModal(mandatoryPullFields),
    };

    dispatch(openModal(modalConfig));
  };

  return (
    <Form className="user-form" autoComplete="off">
      {verticalFields}
      <div className={styles.traderFields} onClick={openShowTraderFieldsModal}>
        <span className="me-2">What fields Trader entity includes</span>
        <FontAwesomeIcon icon={faQuestionCircle} color="dodgerblue" />
      </div>
      <div className={styles.horizontalFields}>{horizontalFields1}</div>
      <div className="pr-form-buttons mt-4">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Edit' : 'Save'}
        </button>

        <CustomLink to="plans">
          <button type="button" className="btn btn-inverse m-l-1">
            Cancel
          </button>
        </CustomLink>
      </div>
    </Form>
  );
};

export default BrandPullApiForm;
