import { IUser } from './interfaces';
import { UserEntity } from './users.entity';

class UserMapper {
  static mapOrmEntityToInterface(entity: UserEntity): IUser {
    return {
      id: entity.id,
      username: entity.username,
      firstName: entity.firstName,
      lastName: entity.lastName,
      role: entity.role,
    };
  }
}

export { UserMapper };
