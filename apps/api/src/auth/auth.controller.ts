import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from '@/types/Request';
import { AuthService } from './auth.service';
import { RegisterDto } from './Register.dto';
import { AccessTokenDto } from './AccessToken.dto';
import { Public } from './Public';
import { LocalAuthGuard } from './local-auth.guard';
import { SignInDto } from './SignIn.dto';

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
    const userId = await this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.fullName,
    );

    // Email already exists.
    if (userId === null) throw new UnprocessableEntityException();

    return this.authService.signToken(userId, registerDto.email);
  }

  /**
   * Sign in with an email and password and return an access token.
   * @param _signInDto Used by LocalAuthGuard.
   * @param req
   * @returns An access token.
   */
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password.',
  }) // Thrown by LocalAuthGuard
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(
    @Body() _signInDto: SignInDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<AccessTokenDto> {
    if (req.user === undefined) throw new InternalServerErrorException();

    return this.authService.signToken(req.user.sub, req.user.email);
  }
}
