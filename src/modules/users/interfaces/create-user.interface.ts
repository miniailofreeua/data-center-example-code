import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { ICreateUserBrandsPayload } from './user-brands.interface';
import { ICreateUserDesksPayload } from './user-desks.interface';
import { ICreateUserTeamLeadsPayload } from './user-team-leads.interface';

export interface ICreateUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  userDesks: ICreateUserDesksPayload[];
  userTeamLeads: ICreateUserTeamLeadsPayload[];
  userBrands: ICreateUserBrandsPayload[];

  brandId: number;
  teamLeadId: number;
}
