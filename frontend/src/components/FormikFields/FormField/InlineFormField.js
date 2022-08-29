import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { FormikError } from '../../index';

const InlineFormField = ({ component, name, label, type, ...restProps }) => {
	return (
		<div className="row d-flex align-items-start">
			<label className="form-control-label text-md-right pt-2 pb-1 col-md-4">{label}</label>
			<div className="pt-2 pb-1 col-md-7">
				<Field name={name} {...(component && { component })} {...(type && { type })} {...restProps} />
				<ErrorMessage component={FormikError} name={name} />
			</div>
		</div>
	);
};

export default InlineFormField;
