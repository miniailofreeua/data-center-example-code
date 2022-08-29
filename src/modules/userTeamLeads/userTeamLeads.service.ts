import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { DeleteResult } from 'typeorm';

import { UserTeamLeadEntity } from './userTeamLeads.entity';

import { UserTeamLeadsRepository } from './userTeamLeads.repository';
class CreateUserTeamLeadsDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  teamLeadId: number;
}
@Injectable()
export class UserTeamLeadsService {
  create: any;
  constructor(
    @InjectRepository(UserTeamLeadsRepository)
    private readonly _UserTeamLeadsRepository: UserTeamLeadsRepository,
  ) {}

  async createUserTeamLead(
    payload: CreateUserTeamLeadsDto,
  ): Promise<Error | UserTeamLeadEntity> {
    const savedUserTeamLead =
      await this._UserTeamLeadsRepository.createAndReturn(payload);
    return savedUserTeamLead;
  }

  async deleteById(id: number): Promise<Error | DeleteResult> {
    const res = await this._UserTeamLeadsRepository.delete({ id });
    return res;
  }
}
