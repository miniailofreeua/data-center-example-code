interface ITraderToBrand {
  firstName: string;
  lastName: string;
  traderId: number;
  brandId: number;
  ftd?: number;
  crmTraderId?: number;
  balance?: string;
  importId?: string;
  saleStatus?: string;
  campaignName?: string;
  subCampaignName?: string;
  ftdDate?: Date;
  lastLoginAt?: Date;
  lastDepositDate?: Date;
  affiliateId?: number;
  phone: string;
  email: string;
  sourceUrl?: string;
  registrationIp?: string;
  language?: string;
  param_1?: string;
  param_2?: string;
  param_3?: string;
  param_4?: string;
  param_5?: string;
  param_7?: string;
  param_8?: string;
  param_9?: string;
}

export default ITraderToBrand;
