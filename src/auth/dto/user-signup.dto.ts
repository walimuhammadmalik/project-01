import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/constant/roles.constant';

export class UserSignUpDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(Role, {
    message:
      'Role must be either NORMAL_USER, PRIVATE_USER, MANAGER, ADMIN, or SUPER_ADMIN',
  })
  role: Role;

  @IsNotEmpty()
  password: string;
}