import { Injectable } from '@nestjs/common';
import { CreateMercadoDto } from './dto/create-mercado.dto';
import { UpdateMercadoDto } from './dto/update-mercado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mercado } from './entities/mercado.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MercadoService {
  constructor(
    @InjectRepository(Mercado) private mercadoRepository: Repository<Mercado>,
  ) {}

  async create(createMercadoDto: CreateMercadoDto, user: User) {
    const post = this.mercadoRepository.create({
      ...createMercadoDto,
      user: user,
    });

    return this.mercadoRepository.save(post);
  }

  findAll() {
    return `This action returns all mercado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mercado`;
  }

  update(id: number, updateMercadoDto: UpdateMercadoDto) {
    return `This action updates a #${id} mercado`;
  }

  remove(id: number) {
    return `This action removes a #${id} mercado`;
  }
}
