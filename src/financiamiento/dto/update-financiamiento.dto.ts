import { PartialType } from '@nestjs/mapped-types';
import { CreateFinanciamientoDto } from './create-financiamiento.dto';

export class UpdateFinanciamientoDto extends PartialType(
  CreateFinanciamientoDto,
) {}
