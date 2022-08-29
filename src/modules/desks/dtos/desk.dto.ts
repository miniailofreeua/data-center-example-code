import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICreateDesk } from '../interfaces';

class CreateDeskDto implements ICreateDesk {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}
class UpdateDeskDto implements ICreateDesk {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  brandId: number;
}

export { CreateDeskDto, UpdateDeskDto };
