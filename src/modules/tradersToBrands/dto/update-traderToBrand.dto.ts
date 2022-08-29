import { IsNumber, IsOptional } from 'class-validator';

class UpdateTraderToBrandDto {
  @IsNumber()
  @IsOptional()
  deskId?: number;

  @IsNumber()
  @IsOptional()
  agentId?: number;

  @IsNumber()
  @IsOptional()
  teamLeadId?: number;

  @IsNumber()
  @IsOptional()
  companyId?: number;
}

export { UpdateTraderToBrandDto };
