import classNames from 'classnames';
import { Row } from 'reactstrap';

const RadioCheckbox = ({ name, label, value, options, onChange, required }) => {
  const renderCheckbox = (option, idx) => {
    const inputId = `${name}${idx}`;
    return (
      <div
        className={classNames('form-check mb-', idx && 'ms-2')}
        onChange={onChange}
      >
        <input
          readOnly
          className="form-check-input"
          type="radio"
          name={name}
          id={inputId}
          required={required}
          value={option.value}
          checked={value === option.value}
        />
        <label className="form-check-label" htmlFor={inputId}>
          {option.label}
        </label>
      </div>
    );
  };

  return (
    <Row md={5} className="d-flex">
      {label && (
        <label className="font-size-14 mt-3 mb-1 w-100">{label}:</label>
      )}

      <div className="w-100 d-flex">{options.map(renderCheckbox)}</div>
    </Row>
  );
};

export default RadioCheckbox;
