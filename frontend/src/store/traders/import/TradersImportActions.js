export const TRADERS_IMPORT_PARSE = 'TRADERS_IMPORT_PARSE';
export const TRADERS_IMPORT_PARSE_REQUEST = 'TRADERS_IMPORT_PARSE_REQUEST';
export const TRADERS_IMPORT_PARSE_SUCCESS = 'TRADERS_IMPORT_PARSE_SUCCESS';
export const TRADERS_IMPORT_PARSE_FAILURE = 'TRADERS_IMPORT_PARSE_FAILURE';

export function tradersImportParse(payload, goToNextStep, brandId) {
  return {
    type: TRADERS_IMPORT_PARSE,
    payload,
    goToNextStep,
    brandId,
  };
}

export const TRADERS_IMPORT_UPLOAD = 'TRADERS_IMPORT_UPLOAD';
export const TRADERS_IMPORT_UPLOAD_REQUEST = 'TRADERS_IMPORT_UPLOAD_REQUEST';
export const TRADERS_IMPORT_UPLOAD_SUCCESS = 'TRADERS_IMPORT_UPLOAD_SUCCESS';
export const TRADERS_IMPORT_UPLOAD_FAILURE = 'TRADERS_IMPORT_UPLOAD_FAILURE';

export function tradersImportUpload(payload, options) {
  return {
    type: TRADERS_IMPORT_UPLOAD,
    payload,
    options,
  };
}

export const CLEAR_IMPORTED_TRADERS = 'CLEAR_IMPORTED_TRADERS';

export function clearImportedTraders() {
  return {
    type: CLEAR_IMPORTED_TRADERS,
  };
}
