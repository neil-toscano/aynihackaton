import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMarketingDto {
  // @IsString()
  // @IsNotEmpty()
  // title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl({}, { each: true }) // Valida que cada elemento en el array sea una URL válida
  @IsOptional()
  imageUrls?: string[];
}
