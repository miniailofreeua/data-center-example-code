import PropTypes from 'prop-types';

const MessageModal = ({ textBody, handleSubmitClick, noButtons }) => {
  return [
    <div className="pb-4" key="modal-text-body">
      {textBody}
    </div>,
    <div className="buttons d-flex justify-content-center" key="modal-buttons">
      {!noButtons && (
        <button className="btn btn-success ml-2" onClick={handleSubmitClick}>
          OK
        </button>
      )}
    </div>,
  ];
};

MessageModal.propTypes = {
  textBody: PropTypes.any.isRequired,
};

export default MessageModal;
