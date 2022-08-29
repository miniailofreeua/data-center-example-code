import { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class ModalUI extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    maxWidth: PropTypes.string,
  };

  render() {
    const { closeModal, label, maxWidth, closeOnOverlayClick } = this.props;
    return (
      <div className="app-modal-wrapper">
        <div
          className="app-modal-overlay"
          onClick={closeOnOverlayClick && closeModal}
        />
        <div className="app-modal" style={{ maxWidth }}>
          <div className="widget p-3">
            <header className="modalHeader">
              <legend>{label}</legend>
              <div className="widget-controls">
                <FontAwesomeIcon
                  data-widgster="close"
                  icon={faTimes}
                  color="#5d8fc2"
                  cursor="pointer"
                  onClick={closeModal}
                />
              </div>
            </header>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalUI;
