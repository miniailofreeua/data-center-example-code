export interface IImportTrader {
  crmTraderId: number;
  importId?: string;
  firstName: string;
  lastName: string;
  saleStatus?: string;
  email: string;
  phone: string;
  balance?: string;
  country?: string;
  sourceCompany?: string;
  ftd?: number | boolean;
  ftdDate?: Date | null | string;
  campaignName?: string;
  subCampaignName?: string;

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
