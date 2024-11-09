import { PartialType } from '@nestjs/mapped-types';
import { CreateMercadoDto } from './create-mercado.dto';

export class UpdateMercadoDto extends PartialType(CreateMercadoDto) {}
