import React, { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ContentPage } from '../../../../components';
import RoleManager from '../../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../../enums';
import { BrandForm } from '../../../../forms';
import { getParams } from '../../../../services/getParams';
import { parse } from '../../../../services/hash';
import {
  clearGetBrandState,
  getBrand,
  updateBrand,
} from '../../../../store/actions';

const EditBrand = ({ loading }) => {
  const dispatch = useDispatch();
  const hashedSaleId = getParams('id');
  const brandId = Number(parse(hashedSaleId));

  const onUnmount = useCallback(() => {
    dispatch(clearGetBrandState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrand(brandId));
    return onUnmount;
  }, [brandId, dispatch, onUnmount]);

  const handleSubmit = (form) => {
    dispatch(updateBrand(brandId, form));
  };

  return (
    <ContentPage
      pageName="Edit Brand"
      breadcrumbs={[
        { link: '/brands', text: 'Brands' },
        { text: 'Edit Brand' },
      ]}
    >
      <div className="form-container">
        <div className="form shadow-wrapper bg-white p-3">
          <BrandForm isEdit handleSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </ContentPage>
  );
};

function mapStateToProps(state) {
  const { loading } = state.UpdateBrand;

  return {
    loading,
  };
}

export default RoleManager(connect(mapStateToProps)(EditBrand), [
  UserRole.Admin,
]);
