import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: process.env.NODE_ENV === 'development',
    }),
  );

  // Validate incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform incoming data to DTOs
      whitelist: true, // Automatically strip out any properties that aren't decorated with a validation decorator
    }),
  );

  await app.listen(3000);
};
bootstrap();
