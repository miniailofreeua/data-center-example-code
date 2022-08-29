import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateTraderCredentialDto } from 'src/modules/traderCredentials/dto/create-traderCredential.dto';
import { CreateTraderToBrandDto } from 'src/modules/tradersToBrands/dto/create-traderToBrand.dto';

class CreateTraderDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsDateString()
  @IsOptional()
  registeredAt?: Date;

  @IsDateString()
  @IsOptional()
  lastLoginAt?: Date;

  @IsNumber()
  @IsOptional()
  ftd?: number;

  @IsNotEmpty()
  traderCredential: CreateTraderCredentialDto;

  @IsNotEmpty()
  traderBrand: CreateTraderToBrandDto;
}

export { CreateTraderDto };
