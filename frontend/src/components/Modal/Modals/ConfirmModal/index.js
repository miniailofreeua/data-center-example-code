import React from 'react';
import PropTypes from 'prop-types';

class ConfirmModal extends React.Component {
  state = {
    isLoading: false,
  };

  handleCancelClick = (wrap, cb) => () => {
    wrap ? wrap(cb) : cb();
  };

  handleSubmitClick = (cb, close, isStrike) => () => {
    cb(close, false, isStrike);
    close();
    this.setState({
      isLoading: true,
    });
  };

  render() {
    const {
      close,
      onSubmit,
      onCancel,
      textBody,
      yesButtonText,
      noButtonText,
      isCoverFee,
    } = this.props;
    const { isLoading } = this.state;

    return (
      <div className="pe-4 ps-4">
        <div className="pt-2" key="modal-text-body">
          {textBody}
        </div>
        <div
          className="buttons d-flex justify-content-center pt-3"
          key="modal-buttons"
        >
          <button
            className="btn btn-danger me-2"
            onClick={this.handleCancelClick(onCancel, close)}
          >
            {noButtonText || 'No'}
          </button>
          <button
            className="btn btn-success ml-2"
            onClick={this.handleSubmitClick(onSubmit, close, isCoverFee)}
            disabled={isLoading}
          >
            {isLoading && (
              <span
                className="spinner-grow spinner-grow-sm m-1"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {yesButtonText || 'Yes'}
          </button>
        </div>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  textBody: PropTypes.any.isRequired,
};

export default ConfirmModal;
