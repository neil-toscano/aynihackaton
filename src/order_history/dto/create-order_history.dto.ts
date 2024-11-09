import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateOrderHistoryDto {
  @IsString()
  content: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date; // El campo 'createdAt' puede ser opcional dependiendo de si lo defines o no en la creación.
}
