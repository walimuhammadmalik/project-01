import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  role?: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  confirmPassword?: string;
}
