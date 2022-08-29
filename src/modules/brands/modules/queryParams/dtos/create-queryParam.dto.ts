import { IsNotEmpty, IsString } from 'class-validator';
import { IQueryParam } from '../interfaces/queryParam.interface';

class CreateQueryParamDto implements IQueryParam {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export { CreateQueryParamDto };
