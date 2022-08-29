import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { IUpdateUserBrandsPayload } from '../interfaces/user-brands.interface';
import { IUpdateUserDesksPayload } from '../interfaces/user-desks.interface';
import { IUpdateUserTeamLeadsPayload } from '../interfaces/user-team-leads.interface';

class PartialUpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  passwordHash: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsArray()
  @IsOptional()
  userDesks: Array<IUpdateUserDesksPayload>;

  @IsArray()
  @IsOptional()
  userTeamLeads: Array<IUpdateUserTeamLeadsPayload>;

  @IsArray()
  @IsOptional()
  userBrands: Array<IUpdateUserBrandsPayload>;

  @IsNumber()
  @IsOptional()
  teamLeadId: number;

  @IsNumber()
  @IsOptional()
  brandId: number;
}

export { PartialUpdateUserDto };
