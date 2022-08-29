import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateIf,
  IsNumber,
} from 'class-validator';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { ICreateUser } from '../interfaces/create-user.interface';
import { ICreateUserBrandsPayload } from '../interfaces/user-brands.interface';
import { ICreateUserDesksPayload } from '../interfaces/user-desks.interface';
import { ICreateUserTeamLeadsPayload } from '../interfaces/user-team-leads.interface';

class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsArray()
  @ValidateIf((payload) =>
    [UserRole.Agent, UserRole.TeamLead, UserRole.CrmManager].includes(
      payload.role,
    ),
  )
  @IsNotEmpty()
  userDesks: Array<ICreateUserDesksPayload>;

  @IsArray()
  @ValidateIf((payload) => [UserRole.CrmManager].includes(payload.role))
  @IsNotEmpty()
  userTeamLeads: Array<ICreateUserTeamLeadsPayload>;

  @IsArray()
  @ValidateIf((payload) => [UserRole.Company].includes(payload.role))
  @IsNotEmpty()
  userBrands: Array<ICreateUserBrandsPayload>;

  @IsNumber()
  @IsOptional()
  teamLeadId: number;

  @IsNumber()
  @IsOptional()
  brandId: number;
}

export { CreateUserDto };
