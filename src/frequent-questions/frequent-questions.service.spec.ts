import { Test, TestingModule } from '@nestjs/testing';
import { FrequentQuestionsService } from './frequent-questions.service';

describe('FrequentQuestionsService', () => {
  let service: FrequentQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrequentQuestionsService],
    }).compile();

    service = module.get<FrequentQuestionsService>(FrequentQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
