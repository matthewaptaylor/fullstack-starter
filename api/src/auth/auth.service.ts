import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate a user's credentials and return a JWT.
   * @param email
   * @param password
   * @returns
   */
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user === undefined || user.password !== password)
      throw new UnauthorizedException();

    // Sign and return the JWT
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
