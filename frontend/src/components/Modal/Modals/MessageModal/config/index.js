import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toastSuccess } from '../../../../../services/notifications';

import styles from './styles.module.scss';

const config = {
  showTraderFieldsModal: (requiredFields = []) => {
    const traderFields1 = [
      'crmTraderId',
      'firstName',
      'lastName',
      'phone',
      'email',
      'country',
      'sourceCompany',
      'ftd',
      'ftdDate',
      'lastLoginAt',
      'lastDepositDate',
      'affiliateId',
      'balance',
      'saleStatus',
      'campaignName',
      'subCampaignName',
      'sourceUrl',
      'registrationIp',
      'language',
      'param_(1-9)',
    ];
    const traderFields2 = [];
    const renderFieldRow = (fieldName) => (
      <div cursor="pointer" className={styles.leadRow}>
        <CopyToClipboard text={fieldName}>
          <div
            onClick={() =>
              toastSuccess({ message: `"${fieldName}" has been copied"` })
            }
          >
            <span className={styles.fieldText}>{fieldName}</span>

            {requiredFields.some((f) => f === fieldName) && (
              <span className={classNames('me-2', styles.required)}>*</span>
            )}
            <FontAwesomeIcon
              icon={faCopy}
              color="dodgerblue"
              cursor="pointer"
            />
          </div>
        </CopyToClipboard>
      </div>
    );
    return {
      header: 'Trader Database Column Names',
      textBody: (
        <div className={styles.fieldsContainer}>
          <div className="me-4">{traderFields1.map(renderFieldRow)}</div>
          <div>{traderFields2.map(renderFieldRow)}</div>
        </div>
      ),
      maxWidth: '500px',
    };
  },
};

export default config;
