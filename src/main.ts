import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import FastifyCors from 'fastify-cors';
import fmp from 'fastify-multipart';

import { AppModule } from './modules/app/app.module';
import { BrandApiCronJobMangerService } from './modules/brands/services/brand-api-cron-job-manager.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('secretapi/zshv1');

  app.register(fmp);

  app.register(FastifyCors, {
    origin: [process.env.WHITELIST_FRONT, process.env.WHITELIST_CONNECTOR],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  await app.listen(process.env.PORT, '0.0.0.0');

  await new BrandApiCronJobMangerService().startUpdateScheduleApiJobs();
}

bootstrap();
