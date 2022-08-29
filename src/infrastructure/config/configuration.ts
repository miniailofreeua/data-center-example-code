import { getOsPath, getOsEnvVar } from '../utils/env.util';

export const configuration = () => ({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  appLink: getOsEnvVar('APP_LINK'), // link to current server
  database: {
    ssl: false,
    host: getOsEnvVar(
      process.env.NODE_ENV === 'production'
        ? 'RDS_HOSTNAME'
        : 'TYPEORM_DATABASE_HOST',
    ),
    port: getOsEnvVar(
      process.env.NODE_ENV === 'production'
        ? 'RDS_PORT'
        : 'TYPEORM_DATABASE_PORT',
    ),
    username: getOsEnvVar(
      process.env.NODE_ENV === 'production'
        ? 'RDS_USERNAME'
        : 'TYPEORM_DATABASE_USERNAME',
    ),
    database: getOsEnvVar(
      process.env.NODE_ENV === 'production'
        ? 'RDS_DB_NAME'
        : 'TYPEORM_DATABASE_NAME',
    ),
    password: getOsEnvVar(
      process.env.NODE_ENV === 'production'
        ? 'RDS_PASSWORD'
        : 'TYPEORM_DATABASE_PASSWORD',
    ),
    entities: getOsPath(getOsEnvVar('TYPEORM_ENTITIES')),
    migrations: getOsPath(getOsEnvVar('TYPEORM_MIGRATIONS')),
    migrationsDir: getOsPath(getOsEnvVar('TYPEORM_MIGRATIONS_DIR')),
  },
});
