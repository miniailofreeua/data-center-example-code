import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDesksService } from './userDesks.service';
import { UserDesksRepository } from './userDesks.repository';
import { UserDesksController } from './userDesks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDesksRepository])],
  controllers: [UserDesksController],
  providers: [UserDesksService],
  exports: [UserDesksService],
})
export class UserDesksModule {}
