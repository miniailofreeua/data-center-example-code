import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { getParams } from '../../../services/getParams';
import { parse } from '../../../services/hash';
import { getFieldsToRender, toUpdate } from './helpers';

import { clearGetUserState, getDesks, getUser } from '../../../store/actions';

import UnificatedForm from '../../../components/UnificatedForm';
import UserProfile from './components/UserProfile';

const SaleEditForm = () => {
  const dispatch = useDispatch();
  const desksList = useSelector((state) => state.GetDesks.list);
  const userState = useSelector((state) => state.GetUser?.current);

  const loading = useSelector((state) => state.UpdateUser.loading);

  const [usernameState, setUsernameState] = useState('');
  const [firstNameState, setFirstNameState] = useState('');
  const [lastNameState, setLastNameState] = useState('');

  const hashedParams = getParams('id');
  const userId = Number(parse(hashedParams));

  const redirect = '/users';

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
      dispatch(getDesks());
    }
    return () => dispatch(clearGetUserState());
  }, [userId, dispatch]);

  useEffect(() => {
    if (userState) {
      setUsernameState(userState.username);
      setFirstNameState(userState.firstName);
      setLastNameState(userState.lastName);
    }
  }, [userState]);

  const onChangeGetState = ({ value, name }) => {
    switch (name) {
      case 'username':
        setUsernameState(value?.toLowerCase().replace(/\s/g, ''));
        break;
      case 'firstName':
        setFirstNameState(value?.replace(/\s/g, ''));
        break;
      default:
        setLastNameState(value?.replace(/\s/g, ''));
        break;
    }
  };

  const handleValidSubmit = (_event, values) => {
    dispatch(toUpdate({ values, userId, redirect }));
  };

  return (
    <React.Fragment>
      <div className="page" style={{ marginTop: '8vh' }}>
        <Row className="align-items-top justify-content-center">
          {userState && (
            <>
              <UserProfile userState={userState} />

              <UnificatedForm
                handleValidSubmit={handleValidSubmit}
                columns={getFieldsToRender({
                  userState,
                  desksList,
                  onChangeGetState,
                  usernameState,
                  firstNameState,
                  lastNameState,
                })}
                isEdit={true}
                loading={loading}
              />
            </>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default connect()(withRouter(SaleEditForm));
