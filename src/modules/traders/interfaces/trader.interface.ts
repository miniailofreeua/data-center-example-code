import { TraderEntity } from '../traders.entity';

export interface ITrader {
  firstName: string;
  lastName: string;
  country: string;
  isValid: boolean;
  ftd: number;
  validationError?: string;
  state?: string;
  language?: string;
  currency?: string;
  registeredAt?: Date;
  lastLoginAt?: Date;
}
export interface IMappedTrader extends TraderEntity {
  crmUserId: number;
  ftdDate: string | null;
  lastDepositDate: string | null;
}
export interface IQueryArray {
  email: string;
  phone: string;
}
export interface IMappedTradersObj {
  queryArray: IQueryArray[];
  mappedTraders: IMappedTrader[];
}
export interface ICreateTraders {
  queryArray: IQueryArray[];
  mappedTraders: IMappedTrader[];
  isImport?: boolean;
}
