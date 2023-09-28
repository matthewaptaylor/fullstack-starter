import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: process.env.NODE_ENV === 'development',
    }),
  );

  // Set up security-related headers
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // Validate incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform incoming data to DTOs
      whitelist: true, // Automatically strip out any properties that aren't decorated with a validation decorator
    }),
  );

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle(process.env.API_NAME)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./openapi.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
};
bootstrap();
