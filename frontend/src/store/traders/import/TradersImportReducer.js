import * as actions from './TradersImportActions';

const initialState = {
  insertedTraders: [],
  failedTraders: [],
  uploadedTraders: [],
  loading: false,
};

const tradersImportReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLEAR_IMPORTED_TRADERS:
      return initialState;
    case actions.TRADERS_IMPORT_PARSE:
      return { ...state, loading: true };
    case actions.TRADERS_IMPORT_PARSE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case actions.TRADERS_IMPORT_UPLOAD:
      return { ...state, loading: true };
    case actions.TRADERS_IMPORT_UPLOAD_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};

export default tradersImportReducer;
