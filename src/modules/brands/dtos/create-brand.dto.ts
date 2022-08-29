import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICreateBrand } from '../interfaces';
import { BrandPullApiEntity } from '../modules/brandPullApis/brandPullApis.entity';
import { BrandUpdateApiEntity } from '../modules/brandUpdateApis/brandUpdateApis.entity';

class CreateBrandDto implements ICreateBrand {
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

export { CreateBrandDto };
