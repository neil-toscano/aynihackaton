import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty() // Asegura que no sea nulo o vacío
  senderId: string;

  @IsUUID()
  @IsNotEmpty()
  receiverId: string;

  @IsString() // Valida que sea una cadena de texto
  @IsNotEmpty()
  content: string;
}
