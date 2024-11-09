import { Injectable } from '@nestjs/common';
import { CreateMarketingDto } from './dto/create-marketing.dto';
import { UpdateMarketingDto } from './dto/update-marketing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marketing } from './entities/marketing.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MarketingService {
  constructor(
    @InjectRepository(Marketing)
    private marketingRepository: Repository<Marketing>,
  ) {}

  async create(createMarketingDto: CreateMarketingDto, user: User) {
    const post = this.marketingRepository.create({
      ...createMarketingDto,
      user: user,
    });

    return this.marketingRepository.save(post);
  }

  findAll() {
    return `This action returns all marketing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketing`;
  }

  update(id: number, updateMarketingDto: UpdateMarketingDto) {
    return `This action updates a #${id} marketing`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketing`;
  }
}
