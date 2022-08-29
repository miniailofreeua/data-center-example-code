import { Component } from 'react';
import { connect } from 'react-redux';

import { DeskForm } from '../../../../forms';
import { ContentPage } from '../../../../components';
import RoleManager from '../../../../containers/RoleManager/RoleManager';

import { UserRole } from '../../../../enums';
import { createDesk } from '../../../../store/actions';

class AddDesk extends Component {
  handleSubmit = (form) => {
    const { dispatch } = this.props;
    dispatch(createDesk(form));
  };

  render() {
    const { loading } = this.props;

    return (
      <ContentPage
        pageName="Create Desk"
        breadcrumbs={[
          { link: '/desks', text: 'Desks' },
          { text: 'Create Desk' },
        ]}
      >
        <div className="form-container">
          <div className="form shadow-wrapper bg-white p-3">
            <DeskForm handleSubmit={this.handleSubmit} loading={loading} />
          </div>
        </div>
      </ContentPage>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.CreateDesk;

  return {
    loading,
  };
}

export default RoleManager(connect(mapStateToProps)(AddDesk), [
  UserRole.Admin,
  UserRole.SuperManager,
]);
