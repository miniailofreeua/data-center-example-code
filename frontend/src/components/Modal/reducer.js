import * as ModalActions from './actions';

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case ModalActions.OPEN_MODAL:
      return [...state, action.obj];
    case ModalActions.CLOSE_MODAL:
      return state.filter((item) => item.id !== action.obj.id);
    default:
      return state;
  }
}

export default reducer;
