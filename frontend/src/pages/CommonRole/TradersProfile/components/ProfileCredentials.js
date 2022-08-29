import moment from 'moment';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import RoleManager from '../../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../../enums/UserRole.enum';

import './styles.scss';

const ProfileCredentials = ({ profiles, credentials, trader }) => {
  const uniquePhones = [...new Set(credentials?.map((c) => c.phone))];
  const uniqueEmails = [...new Set(credentials?.map((c) => c.email))];

  const uniqueCampaignName = [...new Set(profiles?.map((p) => p.campaignName))];
  const uniqueSubCampaignName = [
    ...new Set(profiles?.map((p) => p.subCampaignName)),
  ];

  return (
    <CardBody className="card profile-credentials-container h-100">
      <Card className="p-2 d-flex flex-row items-container">
        <div className="item profile-item ">
          <p className="mb-1">First Name: </p>
          <h5 className="font-size-16">{trader.firstName}</h5>
        </div>
        <div className="item profile-item">
          <p className="mb-1">Last Name: </p>
          <h5 className="font-size-16">{trader.lastName}</h5>
        </div>
      </Card>
      <Card className="p-2 d-flex flex-row items-container">
        <div className="item profile-item">
          <p className="mb-1">Trader ID:</p>
          <h5 className="font-size-16">#{trader.id}</h5>
        </div>
        <div className="item profile-item">
          <p className="mb-1">Registered At:</p>
          <h5 className="font-size-16">
            {trader.registeredAt &&
              trader.registeredAt !== null &&
              moment(trader.registeredAt).format('ll')}
          </h5>
        </div>
      </Card>
      <Card className="p-2 d-flex flex-row items-container">
        <div className="item profile-item">
          <p className="mb-1">Phones: </p>
          {uniquePhones.length !== 0 &&
            uniquePhones[0] !== undefined &&
            uniquePhones.map((phone, idx) => (
              <h5 key={idx} className="font-size-16">
                {phone.substr(0, 7)}*
              </h5>
            ))}
        </div>
        <div className="item profile-item">
          <p className="mb-1">Emails: </p>
          {uniqueEmails.length !== 0 &&
            uniqueEmails[0] !== undefined &&
            uniqueEmails.map((email, idx) => (
              <h5 key={idx} className="font-size-16">
                {email.replace(/([\s\S]{0,3}[<=@].*)/, '*@*')}
              </h5>
            ))}
        </div>
      </Card>
      <Card className="p-2 d-flex flex-row items-container">
        <div className="item profile-item">
          <p className="mb-1">Number Of FTD:</p>
          <h5 className="font-size-16">
            {profiles.reduce(function (total, { ftd }) {
              return total + ftd;
            }, 0)}
          </h5>
        </div>
        <div className="item profile-item">
          <p className="mb-1">Currency: </p>
          <h5 className="font-size-16">{trader.currency}</h5>
        </div>
      </Card>
      <Card className="p-2 d-flex flex-row items-container">
        <div className="item profile-item">
          <p className="mb-1">Language:</p>
          <h5 className="font-size-16">{trader.language}</h5>
        </div>
        <div className="item profile-item">
          <p className="mb-1">Country:</p>
          <h5 className="font-size-16">{trader.country}</h5>
        </div>
      </Card>

      <Card className="p-2 d-flex flex-row items-container">
        <div className="item profile-item">
          <p className="mb-1">Campaign Name: </p>
          {uniqueCampaignName.length > 0 &&
            uniqueCampaignName[0] !== undefined &&
            uniqueCampaignName.map((campaignName, idx) => (
              <h5 key={idx} className="font-size-16">
                {campaignName}
              </h5>
            ))}
        </div>
        <div className="item profile-item">
          <p className="mb-1">SubCampaign Name: </p>
          {uniqueSubCampaignName.length > 0 &&
            uniqueSubCampaignName[0] !== undefined &&
            uniqueSubCampaignName.map((subCampaign, idx) => (
              <h5 key={idx} className="font-size-16">
                {subCampaign}
              </h5>
            ))}
        </div>
      </Card>
      <Card className="p-2 d-flex flex-row items-container">
        <div className="item profile-item">
          <p className="mb-1">Import ID: </p>
          {profiles.length > 0 &&
            profiles.map((element, idx) => (
              <h5 key={idx} className="font-size-16">
                #{element.importId}
              </h5>
            ))}
        </div>
        <div className="item profile-item ">
          <p className="mb-1">Brand ID: </p>
          {profiles.length > 0 &&
            profiles.map((element, idx) => (
              <h5 key={idx} className="font-size-16">
                #{element.brandId}
              </h5>
            ))}
        </div>
      </Card>
    </CardBody>
  );
};

export default RoleManager(connect()(ProfileCredentials), [
  UserRole.Admin,
  UserRole.TeamLead,
  UserRole.SuperManager,
]);
