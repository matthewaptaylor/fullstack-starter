import {
  Controller,
  Get,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthenticatedRequest } from '@/types/Request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Get the currently authenticated user.
   * @param request
   * @returns The currently authenticated user.
   */
  @Get('me')
  me(@Request() request: AuthenticatedRequest) {
    if (request.user === undefined) throw new InternalServerErrorException(); // Satifies TypeScript

    return this.usersService.findOne(request.user.sub);
  }
}
