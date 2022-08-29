import { IsNumberString, IsOptional } from 'class-validator';

export class FindAllAndCountDto {
  @IsNumberString()
  @IsOptional()
  skip: number;

  @IsNumberString()
  @IsOptional()
  take: number;
}
