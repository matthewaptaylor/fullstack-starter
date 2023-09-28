import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  /**
   * This comment appears in the generated Swagger documentation.
   */
  @IsNotEmpty()
  password: string;
}
