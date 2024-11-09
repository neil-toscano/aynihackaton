import { Test, TestingModule } from '@nestjs/testing';
import { MercadoService } from './mercado.service';

describe('MercadoService', () => {
  let service: MercadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoService],
    }).compile();

    service = module.get<MercadoService>(MercadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
