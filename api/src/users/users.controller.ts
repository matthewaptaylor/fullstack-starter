import {
  Controller,
  UseGuards,
  Get,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from '@/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() request: ExpressRequest) {
    if (request.user === undefined) throw new InternalServerErrorException(); // Satifies TypeScript

    return this.usersService.findOne(request.user.sub);
  }
}
