import { UserRole } from 'src/infrastructure/enums/UserRole.enum';

export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
