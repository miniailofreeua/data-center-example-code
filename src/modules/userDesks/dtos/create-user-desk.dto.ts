import { IsNotEmpty, IsNumber } from 'class-validator';
import { ICreateUserDesk } from '../interfaces';

class CreateUserDeskDto implements ICreateUserDesk {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  deskId: number;
}

export { CreateUserDeskDto };
