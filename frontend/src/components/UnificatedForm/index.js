import { Col, CardBody, Card } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm } from 'availity-reactstrap-validation';

import AvReactSelect from '../Inputs/AvReactSelect';
import CustomAvField from '../Inputs/CustomAvField';

const UnificatedForm = ({ columns, handleValidSubmit, loading, isEdit }) => {
  function renderSwitch(field, idx) {
    function handleChange({ value, onChange, name }) {
      if (onChange) {
        onChange({ value, name });
      }
    }

    switch (field.columnType) {
      case 'field':
        return (
          <div key={idx} className="mb-3">
            <CustomAvField field={field} handleChange={handleChange} />
          </div>
        );
      case 'select':
        return (
          <div key={idx} className="mb-3">
            <AvReactSelect
              name={field.name}
              label={field.label}
              defaultValue={field.defaultValue}
              placeholder={field.placeholder}
              required={field.required}
              options={field?.options}
              disabled={field?.disabled}
              onChange={field?.onChange}
            />
          </div>
        );
      default:
        return (
          <div key={idx} className="mb-3">
            <span className="h6">{field.label}: </span>
            <span className="h6">{field.value}</span>
          </div>
        );
    }
  }
  return (
    <Col md={5} lg={5} xl={5} className="my-5 " style={{ Maxwidth: '50%' }}>
      <Card className="h-100">
        <CardBody>
          <div className="p-2 mt-4 ">
            <AvForm
              className="form-horizontal"
              onValidSubmit={(e, v) => {
                handleValidSubmit(e, v);
              }}
            >
              {columns.map((field, idx) => renderSwitch(field, idx))}

              <div className="mt-3">
                <button
                  disabled={loading}
                  className="btn btn-primary w-100 waves-effect waves-light"
                  type="submit"
                >
                  {isEdit ? 'Update' : 'Create'}
                </button>
              </div>
            </AvForm>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default connect()(withRouter(UnificatedForm));
