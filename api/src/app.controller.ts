import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '@/app.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return JSON.stringify(createUserDto);
  }
}
