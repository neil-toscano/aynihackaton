import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetChatDto {
  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @IsUUID()
  @IsNotEmpty()
  receiverId: string;
}
