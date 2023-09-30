import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/users/user.entity';
import { setupEndToEndTests } from './setupEndToEndTests';

describe('AuthController (e2e)', () => {
  let app: NestFastifyApplication;
  let userRepository: Repository<User>;

  setupEndToEndTests((vars) => {
    app = vars.app;
    userRepository = vars.userRepository;
  });

  it('/auth/register (POST) rejects an invalid body', async () => {
    // Empty body
    let res = await app.inject({
      method: 'POST',
      url: '/auth/register',
    });

    expect(res.statusCode).toEqual(400);

    // Invalid email
    res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'john',
        password: '123',
        fullName: 'John Doe',
      },
    });

    expect(res.statusCode).toEqual(400);
  });

  it('/auth/register (POST) registers a user', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'john@example.com',
        password: '123',
        fullName: 'John Doe',
      },
    });

    expect(res.statusCode).toEqual(201);
    expect(res.json()).toHaveProperty('access_token');

    // Check that the user was created
    const user = await userRepository.findOne({
      where: {
        email: 'john@example.com',
      },
    });

    expect(user).toBeDefined();
    expect(user?.email).toEqual('john@example.com');
  });

  it("/auth/register (POST) doesn't duplicate a user", async () => {
    let res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'jack@example.com',
        password: '123',
        fullName: 'Jack Doe',
      },
    });

    expect(res.statusCode).toEqual(201);

    res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'jack@example.com',
        password: '123',
        fullName: 'Jack Doe',
      },
    });

    expect(res.statusCode).toEqual(422);
  });

  it('/auth/signin (POST) rejects an invalid body', async () => {
    // Empty body
    let res = await app.inject({
      method: 'POST',
      url: '/auth/signin',
    });

    expect(res.statusCode).toEqual(400);

    // Invalid email
    res = await app.inject({
      method: 'POST',
      url: '/auth/signin',
      payload: {
        email: 'john',
        password: '123',
      },
    });

    expect(res.statusCode).toEqual(400);
  });

  it('/auth/signin (POST) signs in a user', async () => {
    userRepository.insert({
      email: 'jane@example.com',
      passwordHash: await bcrypt.hash('123', 10),
      fullName: 'Jane Doe',
    });

    // Sign in user
    const res = await app.inject({
      method: 'POST',
      url: '/auth/signin',
      payload: {
        email: 'jane@example.com',
        password: '123',
      },
    });

    expect(res.statusCode).toEqual(200);
    expect(res.json()).toHaveProperty('access_token');
  });

  it('/auth/signin (POST) rejects invalid credentials', async () => {
    userRepository.insert({
      email: 'matt@example.com',
      passwordHash: await bcrypt.hash('123', 10),
      fullName: 'Matt Doe',
    });

    // Sign in user
    const res = await app.inject({
      method: 'POST',
      url: '/auth/signin',
      payload: {
        email: 'matt@example.com',
        password: '456',
      },
    });

    expect(res.statusCode).toEqual(401);
  });
});
