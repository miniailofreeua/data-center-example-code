import { useState } from 'react';
import { AvField } from 'availity-reactstrap-validation';
import { Label } from 'reactstrap';

const CustomAvField = ({ field, handleChange }) => {
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [showPasswordFieldState, setShowPasswordFieldState] = useState(false);
  const [initialTypeState, setInitialTypeState] = useState();
  const [fieldType, setFieldType] = useState('');

  function setAllStates(type) {
    setInitialTypeState(type);
    setShowPasswordState(!showPasswordState);

    if (!showPasswordState) {
      setFieldType(initialTypeState);
    } else {
      setFieldType('string');
    }
  }

  return (
    <div>
      {field.type === 'password' && (
        <div>
          <Label>Set new password?</Label>
          <input
            type="checkbox"
            className="form-check-input"
            style={{ marginLeft: '20px' }}
            id="auth-terms-condition-check"
            value={showPasswordFieldState}
            onChange={() => setShowPasswordFieldState(!showPasswordFieldState)}
          />
        </div>
      )}
      <div style={{ position: 'relative' }}>
        {field.type !== 'password' ? (
          <AvField
            name={field.name}
            label={field.label}
            value={field.value}
            className="form-control"
            placeholder={field.placeholder}
            type={initialTypeState && fieldType}
            required={field?.required}
            disabled={field?.disabled}
            onChange={(e) =>
              handleChange({
                value: e.target.value,
                onChange: field.onChange,
                name: field.name,
              })
            }
          />
        ) : field.type === 'password' && showPasswordFieldState ? (
          <>
            <AvField
              name={field.name}
              label={field.label}
              value={field.value}
              className="form-control"
              placeholder={field.placeholder}
              type={initialTypeState ? fieldType : field.type}
              required={field?.required}
              disabled={field?.disabled}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  onChange: field.onChange,
                  name: field.name,
                })
              }
            />
            {field.type === 'password' && (
              <div onClick={() => setAllStates(field.type)}>
                <div
                  style={{ position: 'absolute', right: '10px', top: '55%' }}
                >
                  {showPasswordState ? (
                    <i className="uil-eye" />
                  ) : (
                    <i className="uil-eye-slash"></i>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default CustomAvField;
