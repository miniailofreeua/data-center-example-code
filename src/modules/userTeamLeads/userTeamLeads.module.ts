import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserTeamLeadsService } from './userTeamLeads.service';
import { UserTeamLeadsRepository } from './userTeamLeads.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeamLeadsRepository])],
  controllers: [],
  providers: [UserTeamLeadsService],
  exports: [UserTeamLeadsService],
})
export class UserTeamLeadsModule {}
