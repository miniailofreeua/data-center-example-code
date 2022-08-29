import React, { Component } from 'react';
import ModalUI from './ModalUI';
import PropTypes from 'prop-types';
import { FormModal, MessageModal } from './Modals';
import ConfirmModal from './Modals/ConfirmModal';
import { modalConfirmConfig } from './Modals/ConfirmModal/config';

export const ModalContext = React.createContext({});

class Modal extends Component {
  static propTypes = {
    item: PropTypes.shape({
      type: PropTypes.string.isRequired,
      onSubmit: PropTypes.func,
    }),
  };

  onClose = () => {
    const { item, onClose } = this.props;
    if (item.onClose) {
      item.onClose();
      onClose(item);
    } else {
      onClose(item);
    }
  };

  onConfirm = () => {
    const { item, onClose } = this.props;
    if (item.onConfirm) {
      item.onConfirm();
    }
    onClose(item);
  };

  renderTypeBasedModal = () => {
    const { type, onSubmit, payload, onCancel } = this.props.item;
    const { header, maxWidth, ...rest } = payload;

    if (type === 'confirm') {
      const { header, ...confirmModalData } =
        modalConfirmConfig[payload.formName]();
      return (
        <ModalUI closeModal={this.onClose} label={header ? header : 'Confirm'}>
          <ConfirmModal
            closeOnOverlayClick
            close={this.onClose}
            onCancel={onCancel}
            onSubmit={onSubmit}
            {...rest}
            {...confirmModalData}
          />
        </ModalUI>
      );
    }
    if (type === 'message') {
      return (
        <ModalUI
          closeOnOverlayClick
          maxWidth={maxWidth}
          closeModal={this.onClose}
          label={header ? header : 'Info'}
        >
          <MessageModal
            close={this.onClose}
            handleSubmitClick={this.onConfirm}
            {...rest}
          />
        </ModalUI>
      );
    }
    if (type === 'form') {
      return (
        <ModalUI closeModal={this.onClose} label={header ? header : 'Form'}>
          <FormModal
            onFormSubmit={onSubmit}
            onFormClose={this.onClose}
            {...rest}
          />
        </ModalUI>
      );
    }

    return <div />;
  };

  render() {
    const contextValues = {
      closeModal: this.onClose,
    };
    return (
      <ModalContext.Provider value={contextValues}>
        {this.renderTypeBasedModal()}
      </ModalContext.Provider>
    );
  }
}

export default Modal;
