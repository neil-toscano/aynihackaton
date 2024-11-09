import { Module } from '@nestjs/common';
import { MercadoService } from './mercado.service';
import { MercadoController } from './mercado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mercado } from './entities/mercado.entity';

@Module({
  controllers: [MercadoController],
  providers: [MercadoService],
  imports: [TypeOrmModule.forFeature([Mercado])],
})
export class MercadoModule {}
