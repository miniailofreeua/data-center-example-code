import { IImportTrader } from 'src/modules/traders/interfaces/import-trader.interface';
import { TraderEntity } from 'src/modules/traders/traders.entity';
export interface ICreateLead {
  leadId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  isValid: boolean;
  validationError: string;
  brandId: number;
}
export interface ILeadData {
  brandId: number;
  affiliateId: number;
  createdById: number;
  leads: IImportTrader[];
}

export interface IFailedTraders extends TraderEntity {
  lead: IImportTrader[];
  brandId: number;
  affiliateId?: number;
  createdById?: number;
}

export interface IResult {
  uploadedTraders: IImportTrader[];
  failedTraders: IFailedTraders[];
}
