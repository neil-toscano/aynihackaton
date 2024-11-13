import { IsString, IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
