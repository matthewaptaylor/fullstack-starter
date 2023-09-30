import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/users/user.entity';
import { setupEndToEndTests } from './setupEndToEndTests';

describe('UsersController (e2e)', () => {
  let app: NestFastifyApplication;
  let userRepository: Repository<User>;

  setupEndToEndTests((vars) => {
    app = vars.app;
    userRepository = vars.userRepository;
  });

  it('/users/me (POST) is not public', async () => {
    // Empty body
    const res = await app.inject({
      method: 'GET',
      url: '/users/me',
    });

    expect(res.statusCode).toEqual(401);
  });

  it('/users/me (POST) returns the user', async () => {
    // Create a user
    userRepository.save({
      email: 'john@example.com',
      passwordHash: await bcrypt.hash('password', 10),
      fullName: 'John Doe',
    });

    // Login
    const loginRes = await app.inject({
      method: 'POST',
      url: '/auth/signin',
      payload: {
        email: 'john@example.com',
        password: 'password',
      },
    });
    expect(loginRes.statusCode).toEqual(200);
    const { access_token } = loginRes.json();
    expect(access_token).toBeDefined();

    // Get user
    const res = await app.inject({
      method: 'GET',
      url: '/users/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    expect(res.statusCode).toEqual(200);
    expect(res.json().email).toEqual('john@example.com');
  });
});
