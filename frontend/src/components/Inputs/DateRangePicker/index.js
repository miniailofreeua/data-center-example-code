import React from 'react';
import Flatpickr from 'react-flatpickr';
import classNames from 'classnames';
import styles from './styles.module.scss';
import 'flatpickr/dist/themes/material_blue.css';
import { ReactComponent as CancelLogo } from '../../../assets/images/fields/cancel.svg';

const DateRangePicker = ({ name, onDateSelect, placeholder, value }) => {
  const handleDateRangeSelect = (selectedDates) => {
    onDateSelect(selectedDates);
  };

  const handleRemoveValue = () => {
    onDateSelect(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Flatpickr
        name={name}
        onChange={handleDateRangeSelect}
        className={classNames(
          'form-control',
          'd-block',
          styles.customFlatpicker,
        )}
        placeholder={placeholder}
        options={{
          mode: 'range',
          dateFormat: 'Y-m-d',
        }}
        value={value}
      />
      {value && (
        <div
          className={classNames('fieldCancel', styles.cancelPosition)}
          onClick={handleRemoveValue}
        >
          <CancelLogo />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
