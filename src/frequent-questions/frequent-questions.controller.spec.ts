import { Test, TestingModule } from '@nestjs/testing';
import { FrequentQuestionsController } from './frequent-questions.controller';
import { FrequentQuestionsService } from './frequent-questions.service';

describe('FrequentQuestionsController', () => {
  let controller: FrequentQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrequentQuestionsController],
      providers: [FrequentQuestionsService],
    }).compile();

    controller = module.get<FrequentQuestionsController>(
      FrequentQuestionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
