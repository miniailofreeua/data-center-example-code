import * as Yup from 'yup';
import { toastError } from '../../services/notifications';

const mandatoryFields = ['crmTraderId'];

const brandApiShape = {
  domain: Yup.string().test(
    'domain',
    'Domain name must start with http:// or https://',
    (domain) => {
      if (!domain) {
        return true;
      }
      return domain.startsWith('https://') || domain.startsWith('http://');
    },
  ),
  apiUrl: Yup.string().optional(''),
  runEverySeconds: Yup.string().optional(''),
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
        const isOneOfMandatoryFieldSkipped = mandatoryFields.some(
          (mandatoryField) => {
            const isAdded = keyToColumnMappings.some(
              (m) => m.columnName === mandatoryField,
            );
            if (!isAdded) {
              toastError({ message: `"${mandatoryField}" is skipped` });
            }
            return !isAdded;
          },
        );
        return !isOneOfMandatoryFieldSkipped;
      },
    ),
};

const getValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('Brand name is required'),
    userDetailsUrl: Yup.string().nullable().required('Brand name is required'),
    brandUrl: Yup.string().nullable().required('Brand name is required'),

    brandPullApis: Yup.array().of(Yup.object().shape(brandApiShape)),
    brandUpdateApis: Yup.array().of(Yup.object().shape(brandApiShape)),
  });
};

export default getValidationSchema;
