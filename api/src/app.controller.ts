import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '@/app.service';
import { CreateUserDto } from '@/CreateUser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Returns a stringified version of the CreateUserDto object.
   * @param createUserDto The CreateUserDto object.
   * @returns A stringified version of the CreateUserDto object.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return JSON.stringify(createUserDto);
  }
}
