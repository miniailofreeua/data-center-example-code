import { IsString, IsNumber, IsOptional } from 'class-validator';
import { IUpdateUserPartialPayload } from '../interfaces/update-user.interface';

class PartialUpdateAgentDto implements IUpdateUserPartialPayload {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsOptional()
  deskId: number;
}

export { PartialUpdateAgentDto };
