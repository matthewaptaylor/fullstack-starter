import {
  Controller,
  Get,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
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
  me(@Request() request: ExpressRequest) {
    if (request.user === undefined) throw new InternalServerErrorException(); // Satifies TypeScript

    return this.usersService.findOne(request.user.sub);
  }
}
