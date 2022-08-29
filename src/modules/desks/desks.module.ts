import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DesksService } from './desks.service';

import { DesksRepository } from './desks.repository';
import { DesksController } from './desks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DesksRepository])],
  controllers: [DesksController],
  providers: [DesksService],
  exports: [DesksService],
})
export class DesksModule {}
