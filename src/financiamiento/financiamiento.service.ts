import { Injectable } from '@nestjs/common';
import { CreateFinanciamientoDto } from './dto/create-financiamiento.dto';
import { UpdateFinanciamientoDto } from './dto/update-financiamiento.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Financiamiento } from './entities/financiamiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinanciamientoService {
  constructor(
    @InjectRepository(Financiamiento)
    private financiamientoRepository: Repository<Financiamiento>,
  ) {}

  create(createFinanciamientoDto: CreateFinanciamientoDto, user: User) {
    const post = this.financiamientoRepository.create({
      ...createFinanciamientoDto,
      user: user,
    });

    return this.financiamientoRepository.save(post);
  }

  findAll() {
    return `This action returns all financiamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financiamiento`;
  }

  update(id: number, updateFinanciamientoDto: UpdateFinanciamientoDto) {
    return `This action updates a #${id} financiamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} financiamiento`;
  }
}
