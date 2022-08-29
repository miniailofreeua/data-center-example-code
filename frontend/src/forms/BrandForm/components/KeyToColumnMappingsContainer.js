import { Label } from 'reactstrap';
import { Field, useFormikContext } from 'formik';
import classNames from 'classnames';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './requestParamsTable.module.scss';

const KeyToColumnMappingsContainer = () => {
  const { values, setFieldValue } = useFormikContext();
  const addNewMappingRow = () => {
    setFieldValue('keyToColumnMappings', [...values.keyToColumnMappings, {}]);
  };
  const removeRow = (idx) => {
    const newKeyToColumnMappings = [];
    values.keyToColumnMappings.forEach((item, index) => {
      if (idx === index) {
        return null;
      }
      newKeyToColumnMappings.push(item);
    });
    setFieldValue('keyToColumnMappings', newKeyToColumnMappings);
  };
  return (
    <>
      <Label>Trader from API to column name Mappings:</Label>
      <div className={classNames(styles.fieldsContainer, styles.divider)}>
        <Label>Response Key</Label>
        <Label>Column Name</Label>
      </div>
      <div className={styles.divider}>
        {values.keyToColumnMappings.map((e, idx) => (
          <div key={idx} className={styles.fieldsContainer}>
            <Field
              type="text"
              className="form-control field"
              name={`keyToColumnMappings[${idx}].key`}
            />
            <Field
              type="text"
              className="form-control field"
              name={`keyToColumnMappings[${idx}].columnName`}
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
        ))}
        <button
          type="button"
          onClick={addNewMappingRow}
          className="btn btn-primary"
          disabled={false}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default KeyToColumnMappingsContainer;
