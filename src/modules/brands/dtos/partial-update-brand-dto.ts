import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { BrandPullApiEntity } from '../modules/brandPullApis/brandPullApis.entity';
import { BrandUpdateApiEntity } from '../modules/brandUpdateApis/brandUpdateApis.entity';

class PartialUpdateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userDetailsUrl: string;

  @IsString()
  @IsNotEmpty()
  brandUrl: string;

  @IsArray()
  brandUpdateApis: BrandUpdateApiEntity[];

  @IsArray()
  brandPullApis: BrandPullApiEntity[];
}

export { PartialUpdateBrandDto };
