import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentPage } from '../../../../components';
import RoleManager from '../../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../../enums';
import { UserForm } from '../../../../forms';
import { createUser } from '../../../../store/actions';

class AddUser extends Component {
  handleSubmit = (form) => {
    const { dispatch } = this.props;
    dispatch(createUser(form));
  };

  render() {
    const { loading } = this.props;

    return (
      <ContentPage
        pageName="Create User"
        breadcrumbs={[
          { link: '/users', text: 'Users' },
          { text: 'Create User' },
        ]}
      >
        <div className="form-container">
          <div className="form shadow-wrapper bg-white p-3">
            <UserForm handleSubmit={this.handleSubmit} loading={loading} />
          </div>
        </div>
      </ContentPage>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.CreateUser;

  return {
    loading,
  };
}

export default RoleManager(
  connect(mapStateToProps)(AddUser),
  [
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
    UserRole.TeamLead,
  ],
  {},
);
