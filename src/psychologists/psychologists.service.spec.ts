import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistsService } from './psychologists.service';

describe('PsychologistsService', () => {
  let service: PsychologistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsychologistsService],
    }).compile();

    service = module.get<PsychologistsService>(PsychologistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
