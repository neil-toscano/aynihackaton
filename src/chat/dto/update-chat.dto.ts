import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
