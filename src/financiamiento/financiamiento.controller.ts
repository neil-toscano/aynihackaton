import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FinanciamientoService } from './financiamiento.service';
import { CreateFinanciamientoDto } from './dto/create-financiamiento.dto';
import { UpdateFinanciamientoDto } from './dto/update-financiamiento.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('financiamiento')
export class FinanciamientoController {
  constructor(private readonly financiamientoService: FinanciamientoService) {}

  @Post()
  @Auth()
  create(
    @Body() createFinanciamientoDto: CreateFinanciamientoDto,
    @GetUser() user: User,
  ) {
    return this.financiamientoService.create(createFinanciamientoDto, user);
  }

  @Get()
  findAll() {
    return this.financiamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financiamientoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinanciamientoDto: UpdateFinanciamientoDto,
  ) {
    return this.financiamientoService.update(+id, updateFinanciamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financiamientoService.remove(+id);
  }
}
