import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsNotEmpty({ message: 'Password must be at least 8 characters.' })
  password: string;
}
