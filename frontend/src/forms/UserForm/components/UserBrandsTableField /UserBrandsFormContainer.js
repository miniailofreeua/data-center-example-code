import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './UserBrandsForm.scss';
import { openModal } from '../../../../components/Modal/actions';
import { BrandsTable } from './BrandsTable';
import { UserRole } from '../../../../enums';

let globalUserBrands = [];

const UserBrandsFormContainer = ({
  isEdit,
  setFieldValue,
  formUserRole,
  userBrands,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    globalUserBrands = userBrands;
    return () => {
      globalUserBrands = [];
    };
  }, [userBrands]);

  const onUserBrandAddSubmit = (addedUserBrand, _closeModal) => {
    const isBrandAlreadyInList = (userBrands || []).some(
      (ud) => ud.brandId === addedUserBrand.brandId,
    );
    if (!isBrandAlreadyInList) {
      const newUserBrands = [...userBrands, addedUserBrand];
      setFieldValue('userBrands', newUserBrands);
      globalUserBrands = newUserBrands;
    }
  };

  const onUserBrandRemoveClick = (userBrand) => {
    const { brandId } = userBrand;
    if (globalUserBrands.find((d) => d.brandId === brandId)) {
      const newUserBrands = globalUserBrands.filter(
        (ud) => ud.brandId !== brandId,
      );
      setFieldValue('userBrands', newUserBrands);
      globalUserBrands = newUserBrands;
    }
  };

  function openUserBrandsModal() {
    dispatch(
      openModal({
        id: 'user-brand',
        type: 'form',
        onSubmit: onUserBrandAddSubmit,
        payload: {
          header: 'User Brands',
          formName: 'userBrands',
          userBrands,
          formUserRole,
        },
      }),
    );
  }

  const data = React.useMemo(() => userBrands, [userBrands]);

  return (
    <div className="form-group row">
      <div className="brands-table-container">
        <div className="table-container">
          <BrandsTable
            data={data}
            isEdit={isEdit}
            onUserBrandRemoveClick={onUserBrandRemoveClick}
            formUserRole={formUserRole}
          />
        </div>
        {formUserRole === UserRole.Company && (
          <div className="icon-wrapper">
            <FontAwesomeIcon
              cursor="pointer"
              icon={faPlusCircle}
              color="Dodgerblue"
              onClick={openUserBrandsModal}
              size="lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const {
    field: { value: userBrands = [] },
    form: {
      setFieldValue,
      values: { role },
    },
  } = props;

  return {
    formUserRole: role,
    userBrands,
    setFieldValue,
  };
};

export default connect(mapStateToProps)(UserBrandsFormContainer);
