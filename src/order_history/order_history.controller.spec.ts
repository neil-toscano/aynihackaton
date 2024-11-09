import { Test, TestingModule } from '@nestjs/testing';
import { OrderHistoryController } from './order_history.controller';
import { OrderHistoryService } from './order_history.service';

describe('OrderHistoryController', () => {
  let controller: OrderHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderHistoryController],
      providers: [OrderHistoryService],
    }).compile();

    controller = module.get<OrderHistoryController>(OrderHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
