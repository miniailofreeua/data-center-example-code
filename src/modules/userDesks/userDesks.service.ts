import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { DeleteResult } from 'typeorm';

import { UserDeskEntity } from './userDesks.entity';

import { UserDesksRepository } from './userDesks.repository';
class CreateUserDesksDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  deskId: number;
}
@Injectable()
export class UserDesksService {
  create: any;
  constructor(
    @InjectRepository(UserDesksRepository)
    private readonly _userDesksRepository: UserDesksRepository,
  ) {}

  async createUserDesk(
    payload: CreateUserDesksDto,
  ): Promise<Error | UserDeskEntity> {
    const savedUserDesk = await this._userDesksRepository.createAndReturn(
      payload,
    );
    return savedUserDesk;
  }

  async deleteById(id: number): Promise<Error | DeleteResult> {
    const res = await this._userDesksRepository.delete({ id });
    return res;
  }
}
