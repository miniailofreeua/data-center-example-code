import * as Yup from 'yup';
import { toastError } from '../../../../services/notifications';
import { mandatoryUpdateFields } from './constants';

const brandApiShape = {
  name: Yup.string().required('API job name is required'),
  domain: Yup.string()
    .test(
      'domain',
      'Domain name must start with http:// or https://',
      (domain) => {
        if (!domain) {
          return true;
        }
        return domain.startsWith('https://') || domain.startsWith('http://');
      },
    )
    .required('Domain is required'),
  apiUrl: Yup.string().required('API URL is required'),
  runEverySeconds: Yup.string().required('Run Schedule is required'),
  queryParams: Yup.array()
    .min(0)
    .optional()
    .test(
      'queryParams',
      'One of mandatory pair field is skipped',
      (queryParams) => {
        if (queryParams.length === 0) {
          return true;
        }
        const isOneOfPairFieldSet = queryParams.some((urlQueryParam) => {
          const { key, value } = urlQueryParam;
          if ((key && !value) || (!key && value)) {
            return false;
          }
          return true;
        });
        return isOneOfPairFieldSet;
      },
    ),
  keyToColumnMappings: Yup.array()
    .min(0)
    .optional()
    .test(
      'keyToColumnMappings',
      'One of mandatory pair field is skipped',
      (keyToColumnMappings) => {
        if (keyToColumnMappings.length === 0) {
          return true;
        }
        const isOneOfPairFieldSet = keyToColumnMappings.some(
          (keyToColumnMapping) => {
            const { key, columnName } = keyToColumnMapping;
            if ((key && !columnName) || (!key && columnName)) {
              return false;
            }
            return true;
          },
        );
        return isOneOfPairFieldSet;
      },
    )
    .test(
      'keyToColumnMappings',
      'Mandatory trader column name is skipped',
      (keyToColumnMappings, context) => {
        const [
          {
            value: { domain, apiUrl, runEverySeconds },
          },
        ] = context.from;
        if (!domain || !apiUrl || !runEverySeconds) {
          return true;
        }
        if (keyToColumnMappings.length === 0) {
          return true;
        }
        const isOneOfMandatoryFieldSkipped = mandatoryUpdateFields.some(
          (mandatoryUpdateField) => {
            const isAdded = keyToColumnMappings.some(
              (m) => m.columnName === mandatoryUpdateField,
            );
            if (!isAdded) {
              toastError({ message: `"${mandatoryUpdateField}" is skipped` });
            }
            return !isAdded;
          },
        );
        return !isOneOfMandatoryFieldSkipped;
      },
    ),
};

const getValidationSchema = () => {
  return Yup.object().shape(brandApiShape);
};

export default getValidationSchema;
