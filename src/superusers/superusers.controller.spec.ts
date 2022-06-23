import { Test, TestingModule } from '@nestjs/testing';
import { SuperusersController } from './superusers.controller';
import { SuperusersService } from './superusers.service';

describe('SuperusersController', () => {
  let controller: SuperusersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperusersController],
      providers: [SuperusersService],
    }).compile();

    controller = module.get<SuperusersController>(SuperusersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
