// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  type: 'postgres',
  ssl: false,
  host: process.env.TYPEORM_DATABASE_HOST,
  port: process.env.TYPEORM_DATABASE_PORT,
  username: process.env.TYPEORM_DATABASE_USERNAME,
  database: process.env.TYPEORM_DATABASE_NAME,
  password: process.env.TYPEORM_DATABASE_PASSWORD,
  entities: [path.join(process.cwd(), process.env.TYPEORM_ENTITIES)],
  migrations: [path.join(process.cwd(), process.env.TYPEORM_MIGRATIONS)],
  migrationsRun: true,
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};
