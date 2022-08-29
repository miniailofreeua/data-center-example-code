import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

class InjectTraderEntityDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
  @IsString()
  @ValidateIf((payload) => !payload.isValid)
  @IsNotEmpty()
  validationError: string;

  @IsNumber()
  @IsNotEmpty()
  brandId?: number;
}

export { InjectTraderEntityDto };
