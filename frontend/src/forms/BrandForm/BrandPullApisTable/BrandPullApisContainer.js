import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { openModal } from '../../../components/Modal/actions';
import { BrandPullApisTable } from './BrandPullApisTable';
import './BrandPullApisForm.scss';
import { toastError } from '../../../services/notifications';

let globalBrandPullApis = [];

const BrandPullApisFormContainer = ({ brandPullApis, setFieldValue }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    globalBrandPullApis = brandPullApis;
    return () => {
      globalBrandPullApis = [];
    };
  }, [brandPullApis]);

  const onBrandPullApiAddSubmit = (addedBrandPullApi) => {
    const isBrandPullApiAlreadyInList = (brandPullApis || []).some(
      (brandPullApi) => brandPullApi.name === addedBrandPullApi.name,
    );
    if (!isBrandPullApiAlreadyInList) {
      const newBrandPullApis = [...brandPullApis, addedBrandPullApi];
      setFieldValue('brandPullApis', newBrandPullApis);
      globalBrandPullApis = newBrandPullApis;
    } else {
      toastError({
        message: 'Brand Update Api with this name is already int the list',
      });
    }
  };

  const onBrandPullApiEditSubmit = (brandPullApiToEdit, _closeModal) => {
    const index = brandPullApis.findIndex(
      (o) => o.id === brandPullApiToEdit.id,
    );

    brandPullApis[index] = brandPullApiToEdit;

    setFieldValue('brandPullApis', brandPullApis);
    globalBrandPullApis = brandPullApis;
  };

  const openBrandPullApisModal = ({ brandPullApi, isEdit }) => {
    dispatch(
      openModal({
        id: 'brand-pull-api',
        type: 'form',
        onSubmit: isEdit ? onBrandPullApiEditSubmit : onBrandPullApiAddSubmit,
        payload: {
          header: 'Brand Pull Api',
          formName: 'brandPullApis',
          brandPullApi,
          isEdit,
        },
      }),
    );
  };

  function openRemoveBrandPullApiConfirmModal(id) {
    const onBrandPullApiRemoveClick = () => {
      if (globalBrandPullApis.find((d) => d.id === id)) {
        const newBrandPullApis = globalBrandPullApis.filter(
          (ud) => ud.id !== id,
        );
        setFieldValue('brandPullApis', newBrandPullApis);
        globalBrandPullApis = newBrandPullApis;
      }
    };
    dispatch(
      openModal({
        id: 'brand-update-api',
        type: 'confirm',
        onSubmit: onBrandPullApiRemoveClick,
        payload: {
          formName: 'removeBrandPullApi',
        },
      }),
    );
  }

  const data = React.useMemo(() => brandPullApis, [brandPullApis]);
  return (
    <div className="form-group row">
      <div className="desks-table-container ">
        <div className="table-container">
          <BrandPullApisTable
            data={data}
            onBrandPullApiRemoveClick={openRemoveBrandPullApiConfirmModal}
            onBrandPullApiEditClick={openBrandPullApisModal}
          />
        </div>

        <div className="icon-wrapper">
          <FontAwesomeIcon
            cursor="pointer"
            icon={faPlusCircle}
            color="Dodgerblue"
            onClick={openBrandPullApisModal}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const {
    form: { setFieldValue, values: brandForm },
  } = props;
  const { brandPullApis } = brandForm || {};
  return {
    brandPullApis,
    setFieldValue,
  };
};

export default connect(mapStateToProps)(BrandPullApisFormContainer);
