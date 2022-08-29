import ReactSwitch from 'react-switch';

const handleChange = (form, field) => (value) => {
  const fieldValue = value;
  form.setFieldValue(field.name, fieldValue);
};

const SwitchFormik = ({ id, field, form }) => {
  return (
    <ReactSwitch
      inputid={id}
      name={field.name}
      checked={field.value}
      onChange={handleChange(form, field)}
    />
  );
};

export default SwitchFormik;
