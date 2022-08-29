import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

class CreateTraderEntityDto {
  @IsString()
  @IsNotEmpty()
  campaignName: string;

  @IsString()
  @IsNotEmpty()
  subCampaignName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsNumber()
  @IsOptional()
  crmTraderId: number;

  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
  @IsString()
  @ValidateIf((payload) => !payload.isValid)
  @IsNotEmpty()
  validationError: string;

  @IsNumber()
  @IsOptional()
  brandId?: number;

  @IsNumber()
  @IsOptional()
  leadId?: number;

  @IsString()
  @IsOptional()
  sourceUrl: string;

  @IsString()
  @IsOptional()
  registrationIp: string;

  @IsString()
  @IsOptional()
  language: any;

  @IsString()
  @IsOptional()
  param_1: string;

  @IsString()
  @IsOptional()
  param_2: string;

  @IsString()
  @IsOptional()
  param_3: string;

  @IsString()
  @IsOptional()
  param_4: string;

  @IsString()
  @IsOptional()
  param_5: string;

  @IsString()
  @IsOptional()
  param_6: string;

  @IsString()
  @IsOptional()
  param_7: string;

  @IsString()
  @IsOptional()
  param_8: string;

  @IsString()
  @IsOptional()
  param_9: string;
}

export { CreateTraderEntityDto };
