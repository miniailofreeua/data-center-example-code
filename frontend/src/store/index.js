import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';
import rootSaga from './sagas';

import history from '../history';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
const store = configureStore(); // exported this instead;

export default store;
