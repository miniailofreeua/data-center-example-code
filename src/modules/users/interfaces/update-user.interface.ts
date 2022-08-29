import { IUser } from './user.interface';

export type IUpdateUserPayload = Omit<IUser, 'id'>;

export type IUpdateUserPartialPayload = Partial<IUpdateUserPayload>;
