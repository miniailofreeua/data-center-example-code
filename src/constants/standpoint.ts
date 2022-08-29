import { StandpointCrmName } from 'src/infrastructure/enums/StandpointCrmName';

const getAccessTokenByCrmName = (crmName) => {
  const {
    STANDPOINT_STANDPOINTFINANCE_TOKEN,
    STANDPOINT_TNTROYAL_TOKEN,
    STANDPOINT_PROFITFX_TOKEN,
  } = process.env;
  const accessTokenByCrmName = {
    [StandpointCrmName.standpointfinance]: STANDPOINT_STANDPOINTFINANCE_TOKEN,
    [StandpointCrmName.tntroyal]: STANDPOINT_TNTROYAL_TOKEN,
    [StandpointCrmName.profitfx]: STANDPOINT_PROFITFX_TOKEN,
  };

  return accessTokenByCrmName[crmName];
};

export const getStandpointApiUrl = (crmName: StandpointCrmName, params) =>
  `https://crm.${crmName}/api/v6/terms/Traders?token=${getAccessTokenByCrmName(
    crmName,
  )}${params}`;
