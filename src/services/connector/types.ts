export type TraderBrandsT = {
  firstName: string;
  lastName: string;
  traderId: number;
  brandId: number;
  ftd: number;
  crmTraderId?: number;
  balance: string;
  importId?: string;
  saleStatus?: string;
  campaignName?: string;
  subCampaignName?: string;
  ftdDate?: Date;
  lastLoginAt?: Date;
  lastDepositDate?: Date;
  affiliateId?: number;
};

export type TraderT = {
  firstName: string;
  lastName: string;
  country: string;
  isValid: boolean;
  validationError?: string;
  state?: string;
  language?: string;
  currency?: string;
  registeredAt?: Date;
  lastLoginAt?: Date;
  ftd: number;
};

export type TraderCredentialT = {
  id: number;
  traderId: number;
  leadId: number;
  email: string;
  phone: string;
  brandId: number;
  trader: TraderT;
  traderBrands: TraderBrandsT[];
};

export type InjectLeadT = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  brandId: number;
  isValid: boolean;
  validationError: string | null;
};
