import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopsController } from './workshops.controller';
import { WorkshopsService } from './workshops.service';

describe('WorkshopsController', () => {
  let controller: WorkshopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkshopsController],
      providers: [WorkshopsService],
    }).compile();

    controller = module.get<WorkshopsController>(WorkshopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
