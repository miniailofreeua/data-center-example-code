import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UsersPreloadService } from './services/users-preload.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UserDesksModule } from '../userDesks/userDesks.module';
import { UserDesksRepository } from '../userDesks/userDesks.repository';
import { UserTeamLeadsModule } from '../userTeamLeads/userTeamLeads.module';
import { UserTeamLeadsRepository } from '../userTeamLeads/userTeamLeads.repository';
import { UserBrandsRepository } from '../userBrands/userBrands.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      UserDesksRepository,
      UserTeamLeadsRepository,
      UserBrandsRepository,
    ]),
    UserDesksModule,
    UserTeamLeadsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersPreloadService],
  exports: [UsersService, UsersPreloadService],
})
export class UsersModule {}
