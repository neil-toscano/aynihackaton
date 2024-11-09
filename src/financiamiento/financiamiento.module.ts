import { Module } from '@nestjs/common';
import { FinanciamientoService } from './financiamiento.service';
import { FinanciamientoController } from './financiamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Financiamiento } from './entities/financiamiento.entity';

@Module({
  controllers: [FinanciamientoController],
  providers: [FinanciamientoService],
  imports: [TypeOrmModule.forFeature([Financiamiento])],
})
export class FinanciamientoModule {}
