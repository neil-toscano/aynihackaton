import { Test, TestingModule } from '@nestjs/testing';
import { MercadoController } from './mercado.controller';
import { MercadoService } from './mercado.service';

describe('MercadoController', () => {
  let controller: MercadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadoController],
      providers: [MercadoService],
    }).compile();

    controller = module.get<MercadoController>(MercadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
