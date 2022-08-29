import PropTypes from 'prop-types';
import formsConfigSwitch from './modalFormsConfig';

const FormModal = ({ formName, ...rest }) => formsConfigSwitch(formName)(rest);

FormModal.propTypes = {
	formName: PropTypes.string.isRequired
};

export default FormModal;
