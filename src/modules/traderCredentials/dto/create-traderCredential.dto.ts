import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateTraderCredentialDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}

export { CreateTraderCredentialDto };
