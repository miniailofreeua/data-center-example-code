import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ReactTable } from '../../../components';
import BrandsColumnList from './BrandsColumnList';

import { clearGetBrandsState, getBrands } from '../../../store/actions';
import RoleManager from '../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../enums';
import { ContentPage } from '../../../components';
import { getActions } from './helpers';

const BrandsList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.GetBrands);

  useEffect(() => {
    return () => {
      dispatch(clearGetBrandsState());
    };
  }, [dispatch]);

  const userRole = localStorage.getItem('userRole');

  return (
    <ContentPage
      pageName="Brands"
      breadcrumbs={[{ text: 'Brands' }]}
      actions={getActions(userRole)}
    >
      <div>
        <ReactTable
          pageName="Brands"
          data={list}
          columns={BrandsColumnList}
          fetchData={getBrands}
          loading={loading}
        />
      </div>
    </ContentPage>
  );
};

export default withRouter(RoleManager(connect()(BrandsList), [UserRole.Admin]));
