import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john@example.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria@example.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}
