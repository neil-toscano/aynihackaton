import { Module } from '@nestjs/common';
import { OrderHistoryService } from './order_history.service';
import { OrderHistoryController } from './order_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistory } from './entities/order_history.entity';

@Module({
  controllers: [OrderHistoryController],
  providers: [OrderHistoryService],
  imports: [TypeOrmModule.forFeature([OrderHistory])],
})
export class OrderHistoryModule {}
