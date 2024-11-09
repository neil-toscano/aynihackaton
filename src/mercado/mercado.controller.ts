import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MercadoService } from './mercado.service';
import { CreateMercadoDto } from './dto/create-mercado.dto';
import { UpdateMercadoDto } from './dto/update-mercado.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('mercado')
export class MercadoController {
  constructor(private readonly mercadoService: MercadoService) {}

  @Post()
  @Auth()
  create(@Body() createMercadoDto: CreateMercadoDto, @GetUser() user: User) {
    return this.mercadoService.create(createMercadoDto, user);
  }

  @Get()
  findAll() {
    return this.mercadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mercadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMercadoDto: UpdateMercadoDto) {
    return this.mercadoService.update(+id, updateMercadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mercadoService.remove(+id);
  }
}
