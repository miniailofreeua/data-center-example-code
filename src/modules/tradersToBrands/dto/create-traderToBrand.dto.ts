import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class CreateTraderToBrandDto {
  @IsString()
  @IsOptional()
  importId?: string;

  @IsNumber()
  @IsOptional()
  leadId: number;

  @IsString()
  @IsOptional()
  saleStatus?: string;

  @IsString()
  @IsOptional()
  campaignName?: string;

  @IsString()
  @IsOptional()
  subCampaignName?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  brandId: number;

  @IsString()
  @IsOptional()
  crmTraderId: number;

  @IsNumber()
  @IsOptional()
  ftd?: number;

  @IsNumber()
  @IsOptional()
  ftdDate?: Date;

  @IsString()
  @IsOptional()
  balance?: string;

  @IsNumber()
  @IsOptional()
  lastLoginAt?: Date;

  @IsNumber()
  @IsOptional()
  lastDepositDate?: Date;

  @IsNumber()
  @IsOptional()
  affiliateId?: number;
}

export { CreateTraderToBrandDto };
