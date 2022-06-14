import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistsController } from './psychologists.controller';
import { PsychologistsService } from './psychologists.service';

describe('PsychologistsController', () => {
  let controller: PsychologistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsychologistsController],
      providers: [PsychologistsService],
    }).compile();

    controller = module.get<PsychologistsController>(PsychologistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
