import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
