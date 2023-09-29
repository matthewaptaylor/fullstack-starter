import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user.
   * @param email
   * @param passwordHash
   * @param fullName
   * @returns The created user's ID, or null if a user with the same email already exists.
   */
  async create(email: string, passwordHash: string, fullName: string) {
    try {
      return (
        await this.usersRepository.insert({
          email,
          passwordHash,
          fullName,
        })
      ).identifiers[0].id as number;
    } catch (e) {
      if (typeof e === 'object' && e && 'code' in e && e.code === '23505')
        return null; // Duplicate entry

      throw e;
    }
  }

  async findOne(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
