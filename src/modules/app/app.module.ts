import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { typeormUseFactory } from 'src/infrastructure/config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from '../../infrastructure/config/configuration';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { BrandsModule } from '../brands/brands.module';
import { TradersModule } from '../traders/traders.module';
import { GetTradersModule } from '../traders/getTraders/getTraders.module';
import { PullTradersFromStandpointModule } from '../cronJobs/pullTradersFromStandpointCron/pullTradersFromStandpoint.module';
import { CheckTraderHookModule } from '../tradersWebhooks/tradersWebhooks.module';
import { DesksModule } from '../desks/desks.module';
import { ImportCustomFieldsModule } from '../traders/importCustomFields/importCustomFields.module';
import { UpdateConnectorLeadFtdModule } from '../cronJobs/updateConnectorLeadFtdCron/updateConnectorLeadFtd.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        process.env.NODE_ENV === 'production' ? '../../..' : '../../../dist',
        'frontend/build',
      ),
    }),

    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: process.env.NODE_ENV === 'production' ? undefined : '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormUseFactory,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    BrandsModule,
    DesksModule,
    PullTradersFromStandpointModule,
    TradersModule,
    GetTradersModule,
    UpdateConnectorLeadFtdModule,
    CheckTraderHookModule,
    ImportCustomFieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
