import { IsNotEmpty, IsOptional, IsString, IsInt, Min, IsUrl } from 'class-validator';

export class CreatePostDto {
  // @IsString()
  // @IsNotEmpty()
  // title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  likes?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  commentsCount?: number;

  @IsUrl({}, { each: true }) // Valida que cada elemento en el array sea una URL válida
  @IsOptional()
  imageUrls?: string[];
}
