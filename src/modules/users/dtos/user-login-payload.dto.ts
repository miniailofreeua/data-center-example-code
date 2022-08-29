import { IsString } from 'class-validator';
import { IUserLoginPayload } from '../interfaces/login-user.interface';

class UserLoginPayloadDto implements IUserLoginPayload {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export { UserLoginPayloadDto };
