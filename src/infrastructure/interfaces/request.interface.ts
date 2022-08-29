import { Request } from 'express';
import { UserEntity } from 'src/modules/users/users.entity';

export interface IRequest extends Request {
  user: UserEntity;
}
