export interface IUserDesks {
  id: number;
  deskId: number;
  userId: number;
}

export type ICreateUserDesksPayload = Omit<Omit<IUserDesks, 'userId'>, 'id'>;

export type IUpdateUserDesksPayload = IUserDesks;
