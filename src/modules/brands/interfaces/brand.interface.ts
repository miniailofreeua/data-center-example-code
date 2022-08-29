import { FindOperator } from 'typeorm';

export interface IBrandCreate {
  name: string;
  userDetailsUrl: string;
  brandUrl: string;
}

export interface IBrand {
  id: number;
  name: string;
  userDetailsUrl: string;
  brandUrl: string;
}

export interface IBrandFindOption {
  name: string | FindOperator<string>;
}
