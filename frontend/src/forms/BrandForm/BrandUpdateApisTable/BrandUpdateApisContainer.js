import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { openModal } from '../../../components/Modal/actions';
import { BrandUpdateApisTable } from './BrandUpdateApisTable';
import './BrandUpdateApisForm.scss';
import { toastError } from '../../../services/notifications';

let globalBrandUpdateApis = [];

const BrandUpdateApisFormContainer = ({ brandUpdateApis, setFieldValue }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    globalBrandUpdateApis = brandUpdateApis;
    return () => {
      globalBrandUpdateApis = [];
    };
  }, [brandUpdateApis]);

  const onBrandUpdateApiAddSubmit = (addedBrandUpdateApi) => {
    const isBrandUpdateApiAlreadyInList = (brandUpdateApis || []).some(
      (brandUpdateApi) => brandUpdateApi.name === addedBrandUpdateApi.name,
    );
    if (!isBrandUpdateApiAlreadyInList) {
      const newBrandUpdateApis = [...brandUpdateApis, addedBrandUpdateApi];
      setFieldValue('brandUpdateApis', newBrandUpdateApis);
      globalBrandUpdateApis = newBrandUpdateApis;
    } else {
      toastError({
        message: 'Brand Update Api with this name is already int the list',
      });
    }
  };

  const onBrandUpdateApiEditSubmit = (brandUpdateApiToEdit, _closeModal) => {
    const index = brandUpdateApis.findIndex(
      (o) => o.id === brandUpdateApiToEdit.id,
    );

    brandUpdateApis[index] = brandUpdateApiToEdit;

    setFieldValue('brandUpdateApis', brandUpdateApis);
    globalBrandUpdateApis = brandUpdateApis;
  };

  const openBrandUpdateApisModal = ({ brandUpdateApi, isEdit }) => {
    dispatch(
      openModal({
        id: 'brand-payment-plan',
        type: 'form',
        onSubmit: isEdit
          ? onBrandUpdateApiEditSubmit
          : onBrandUpdateApiAddSubmit,
        payload: {
          header: 'Brand Update Api',
          formName: 'brandUpdateApis',
          brandUpdateApi,
        },
      }),
    );
  };

  function openRemoveBrandUpdateApiConfirmModal(id) {
    const onBrandUpdateApiRemoveClick = () => {
      if (globalBrandUpdateApis.find((d) => d.id === id)) {
        const newBrandUpdateApis = globalBrandUpdateApis.filter(
          (ud) => ud.id !== id,
        );
        setFieldValue('brandUpdateApis', newBrandUpdateApis);
        globalBrandUpdateApis = newBrandUpdateApis;
      }
    };
    dispatch(
      openModal({
        id: 'brand-update-api',
        type: 'confirm',
        onSubmit: onBrandUpdateApiRemoveClick,
        payload: {
          formName: 'removeBrandUpdateApi',
        },
      }),
    );
  }

  const data = React.useMemo(() => brandUpdateApis, [brandUpdateApis]);
  return (
    <div className="form-group row">
      <div className="desks-table-container ">
        <div className="table-container">
          <BrandUpdateApisTable
            data={data}
            onBrandUpdateApiRemoveClick={openRemoveBrandUpdateApiConfirmModal}
            onBrandUpdateApiEditClick={openBrandUpdateApisModal}
          />
        </div>

        <div className="icon-wrapper">
          <FontAwesomeIcon
            cursor="pointer"
            icon={faPlusCircle}
            color="Dodgerblue"
            onClick={openBrandUpdateApisModal}
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
  const { brandUpdateApis } = brandForm || {};
  return {
    brandUpdateApis,
    setFieldValue,
  };
};

export default connect(mapStateToProps)(BrandUpdateApisFormContainer);
