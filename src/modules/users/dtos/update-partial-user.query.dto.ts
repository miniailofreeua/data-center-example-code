import { IsBoolean, IsOptional } from 'class-validator';

class UpdatePartialUserQueryDto {
  @IsBoolean()
  @IsOptional()
  isCascadeUpdateAllowed: boolean;
}

export { UpdatePartialUserQueryDto };
