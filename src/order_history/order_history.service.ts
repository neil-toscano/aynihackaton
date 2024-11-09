import { Injectable } from '@nestjs/common';
import { CreateOrderHistoryDto } from './dto/create-order_history.dto';
import { UpdateOrderHistoryDto } from './dto/update-order_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderHistory } from './entities/order_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectRepository(OrderHistory)
    private orderHistoryRepository: Repository<OrderHistory>,
  ) {}

  async create(createOderHistoryDto: CreateOrderHistoryDto) {
    const post = this.orderHistoryRepository.create({
      ...createOderHistoryDto,
    });

    return this.orderHistoryRepository.save(post);
  }

  findAll() {
    return `This action returns all orderHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderHistory`;
  }

  update(id: number, updateOrderHistoryDto: UpdateOrderHistoryDto) {
    return `This action updates a #${id} orderHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderHistory`;
  }
}
