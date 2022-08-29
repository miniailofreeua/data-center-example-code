import { UserRole } from 'src/infrastructure/enums/UserRole.enum';

export interface ICreateAgent {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  deskId: number;
}
