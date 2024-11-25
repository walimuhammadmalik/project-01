import { IsNotEmpty } from 'class-validator';

export class resetPasswordDto {
  @IsNotEmpty()
  otp: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
