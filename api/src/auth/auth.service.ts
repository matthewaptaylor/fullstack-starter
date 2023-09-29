import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { AccessTokenDto } from './AccessToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async signToken(
    userId: number,
    email: string,
  ): Promise<AccessTokenDto> {
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
   * @returns A JWT, or null if a user with the same email already exists.
   */
  async register(email: string, password: string, fullName: string) {
    const userId = await this.usersService.create(email, password, fullName);

    if (userId === null) return null;
    return this.signToken(userId, email);
  }

  /**
   * Validate a user's credentials and return a JWT.
   * @param email
   * @param password
   * @returns A JWT, or null if the credentials are invalid.
   */
  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (user === null || user.password !== password) return null;

    return this.signToken(user.id, user.email);
  }
}
