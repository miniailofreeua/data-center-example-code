import { IsNotEmpty, IsString } from 'class-validator';
import { IBrandUpdateApi } from '../interfaces/brandUpdateApi.interface';

class CreateBrandUpdateApiDto implements IBrandUpdateApi {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export { CreateBrandUpdateApiDto };
