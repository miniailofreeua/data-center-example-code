import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContentPage } from '../../../../components';
import RoleManager from '../../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../../enums';
import { BrandForm } from '../../../../forms';
import { createBrand } from '../../../../store/actions';

import { openModal } from '../../../../store/actions';

class AddBrand extends Component {
  handleSubmit = (form) => {
    const { dispatch } = this.props;
    dispatch(createBrand(form));
  };

  render() {
    const { loading } = this.props;

    return (
      <ContentPage
        pageName="Create Brand"
        breadcrumbs={[
          { link: '/brands', text: 'Brands' },
          { text: 'Create Brand' },
        ]}
      >
        <div className="form-container">
          <div className="form shadow-wrapper bg-white p-3">
            <BrandForm handleSubmit={this.handleSubmit} loading={loading} />
          </div>
        </div>
      </ContentPage>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.CreateBrand;

  return {
    loading,
  };
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ openModal }, dispatch),
});

export default RoleManager(
  connect(mapStateToProps, mapDispatchToProps)(AddBrand),
  [UserRole.Admin],
);
