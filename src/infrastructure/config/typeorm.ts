import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormUseFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  ssl: process.env.NODE_ENV === 'production' ? true : false,
  ...(process.env.NODE_ENV === 'production' && {
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  host: configService.get('database.host'),
  port: +configService.get<number>('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.database'),
  entities: [configService.get('database.entities')],
  migrations: [configService.get('database.migrations')],
  migrationsRun: true,
  logging: true,
});
