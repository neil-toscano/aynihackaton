import { Test, TestingModule } from '@nestjs/testing';
import { FinanciamientoController } from './financiamiento.controller';
import { FinanciamientoService } from './financiamiento.service';

describe('FinanciamientoController', () => {
  let controller: FinanciamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanciamientoController],
      providers: [FinanciamientoService],
    }).compile();

    controller = module.get<FinanciamientoController>(FinanciamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
