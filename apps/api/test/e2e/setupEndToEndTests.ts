import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreModule } from '@/core/core.module';
import { AuthModule } from '@/auth/auth.module';
import { User } from '@/users/user.entity';
import setupEnv from '@/setupEnv';
import { createTypeOrmConfig } from '@/typeorm';

interface SetupEndToEndTestsVariables {
  app: NestFastifyApplication;
  userRepository: Repository<User>;
}

/**
 * Setup a NestJS application for end-to-end testing.
 * @param setVariables A callback that receives the app and repositories.
 */
export const setupEndToEndTests = (
  setVariables: (vars: SetupEndToEndTestsVariables) => void,
) => {
  setupEnv();

  let app: NestFastifyApplication;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        TypeOrmModule.forRoot({
          ...createTypeOrmConfig(),
          synchronize: true,
          autoLoadEntities: true,
        }),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    // Setup repositories for verification
    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );

    setVariables({ app, userRepository });
  });

  afterEach(async () => {
    await userRepository.clear(); // Clean database after each test
    await app.close(); // Close NestJS server
  });
};
