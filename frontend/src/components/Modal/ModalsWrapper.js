import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import MyPortal from './Portal';
import { closeModal } from './actions';
import './Modal.scss';

class Modals extends Component {
  handleClose = (item) => {
    const { dispatch } = this.props;
    dispatch(closeModal(item));
  };

  render() {
    const modals = this.props.modals.map((item, i) => (
      <MyPortal key={i}>
        <Modal item={item} onClose={this.handleClose} />
      </MyPortal>
    ));

    return <div className="modals">{modals}</div>;
  }
}

const ModalContainer = connect(
  function mapStateToProps(state) {
    return {
      modals: state.modals,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    };
  },
)(Modals);

export { ModalContainer };
