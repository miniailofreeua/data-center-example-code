import { Module } from '@nestjs/common';
import { TraderCredentialsService } from './traderCredentials.service';
import { TraderCredentialsRepository } from './traderCredentials.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TraderCredentialsRepository])],
  controllers: [],
  providers: [TraderCredentialsService],
  exports: [TraderCredentialsService],
})
export class TraderCredentialsModule {}
