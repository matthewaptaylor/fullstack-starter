import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { AccessTokenDto } from './AccessToken.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signToken(userId: number, email: string): Promise<AccessTokenDto> {
    return {
      access_token: await this.jwtService.signAsync({
        sub: userId,
        email,
      }),
    };
  }

  /**
   * Creates a new user and returns a JWT.
   * @param email
   * @param password
   * @param fullName
   * @returns The user's ID, or null if the email already exists.
   */
  async register(email: string, password: string, fullName: string) {
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);

    return this.usersService.create(email, passwordHash, fullName);
  }

  /**
   * Validate a user's credentials.
   * @param email
   * @param password
   * @returns The user if the credentials are valid, or null if they are not.
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user === null || !(await bcrypt.compare(password, user.passwordHash)))
      return null; // Invalid credentials

    return user;
  }
}
