import React from 'react';
import PropTypes from 'prop-types';

const FieldError = ({ children, className }) => {
	if (children && typeof children !== 'string') {
		return (
			<div className={`error-message my-0 mx-2 ${className}`}>
				{Object.keys(children).map((fieldKey, idx) => (
					<div key={`error-${idx}`}>
						{fieldKey}: {JSON.stringify(children[fieldKey])}
					</div>
				))}
			</div>
		);
	} else {
		return <span className={`error-message ${className}`}>{children}</span>;
	}
};

FieldError.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired])
};

export default FieldError;
