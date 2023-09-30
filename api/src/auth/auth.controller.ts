import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './Register.dto';
import { SignInDto } from './SignIn.dto';
import { AccessTokenDto } from './AccessToken.dto';
import { Public } from './Public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register a new user and return an access token.
   * @param registerDto
   * @returns An access token.
   */
  @HttpCode(HttpStatus.CREATED)
  @ApiUnprocessableEntityResponse({
    description: 'Email already exists.',
  })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AccessTokenDto> {
    const token = await this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.fullName,
    );

    // Email already exists.
    if (token === null) throw new UnprocessableEntityException();

    return token;
  }

  /**
   * Sign in with an email and password and return an access token.
   * @param signInDto
   * @returns An access token.
   */
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password.',
  })
  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<AccessTokenDto> {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    if (token === null) throw new UnauthorizedException();

    return token;
  }
}
