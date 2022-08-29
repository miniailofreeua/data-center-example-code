import { IsNotEmpty, IsString } from 'class-validator';
import { IBrandPullApi } from '../interfaces/brandPullApi.interface';

class CreateBrandPullApiDto implements IBrandPullApi {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export { CreateBrandPullApiDto };
