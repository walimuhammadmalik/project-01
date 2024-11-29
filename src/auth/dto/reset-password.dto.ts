import { IsNotEmpty } from 'class-validator';

export class resetPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
