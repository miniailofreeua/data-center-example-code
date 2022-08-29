import { Label } from 'reactstrap';
import { Field, useFormikContext } from 'formik';
import classNames from 'classnames';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SelectFormFieldFormik } from '../../../components';
import { QueryParamDateListOptions } from '../../../enums/QueryParamDate.enum';

import styles from './requestParamsTable.module.scss';

const QueryParamsContainer = () => {
  const { values, setFieldValue } = useFormikContext();
  const addNewMappingRow = () => {
    setFieldValue('queryParams', [...values.queryParams, {}]);
  };
  const addDateMappingRow = () => {
    setFieldValue('queryParams', [
      ...values.queryParams,
      {
        component: SelectFormFieldFormik,
        options: QueryParamDateListOptions,
      },
    ]);
  };
  const removeRow = (idx) => {
    const newQueryParams = [];
    values.queryParams.forEach((item, index) => {
      if (idx === index) {
        return null;
      }
      newQueryParams.push(item);
    });
    setFieldValue('queryParams', newQueryParams);
  };
  return (
    <>
      <Label>Query Params:</Label>
      <div className={classNames(styles.fieldsContainer, styles.divider)}>
        <Label>Key</Label>
        <Label>Value</Label>
      </div>
      <div className={styles.divider}>
        {values.queryParams.map((queryParam, idx) => {
          const selectedOption = QueryParamDateListOptions.find(
            (o) => o.value === queryParam.value,
          );

          const component = queryParam.component
            ? queryParam.component
            : selectedOption
            ? SelectFormFieldFormik
            : null;

          const restOptions = {
            ...(component && { component }),
            ...(selectedOption && {
              selectedOption,
            }),
            options: queryParam.options || QueryParamDateListOptions,
          };
          return (
            <div key={idx} className={styles.fieldsContainer}>
              <Field
                type="text"
                className="form-control field"
                name={`queryParams[${idx}].key`}
              />
              <Field
                type="text"
                className="form-control field"
                name={`queryParams[${idx}].value`}
                {...restOptions}
              />
              <FontAwesomeIcon
                cursor="pointer"
                icon={faPlusCircle}
                color="Dodgerblue"
                className="ms-1"
                style={{ transform: 'rotate(45deg)' }}
                onClick={() => removeRow(idx)}
                size="lg"
              />
            </div>
          );
        })}
        <button
          type="button"
          onClick={addNewMappingRow}
          className="btn btn-primary me-2"
          disabled={false}
        >
          Add
        </button>
        <button
          type="button"
          onClick={addDateMappingRow}
          className="btn btn-primary"
          disabled={false}
        >
          Add Date Field
        </button>
      </div>
    </>
  );
};

export default QueryParamsContainer;
