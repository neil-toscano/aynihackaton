import { Test, TestingModule } from '@nestjs/testing';
import { FinanciamientoService } from './financiamiento.service';

describe('FinanciamientoService', () => {
  let service: FinanciamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanciamientoService],
    }).compile();

    service = module.get<FinanciamientoService>(FinanciamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
