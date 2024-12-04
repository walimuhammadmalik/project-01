import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  role?: string;

  @IsNotEmpty({ message: 'Password must be at least 8 characters' })
  password: string;

  @IsOptional()
  confirmPassword?: string;

  @IsOptional()
  otp?: number;
}
