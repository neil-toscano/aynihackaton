import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { SocialLoginDto } from 'src/auth/dto/social-login.dto';

export class UpdateUserDto extends PartialType(SocialLoginDto) {
  @IsOptional()
  @IsUrl()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
