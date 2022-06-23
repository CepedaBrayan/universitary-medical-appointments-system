import { Test, TestingModule } from '@nestjs/testing';
import { SuperusersService } from './superusers.service';

describe('SuperusersService', () => {
  let service: SuperusersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperusersService],
    }).compile();

    service = module.get<SuperusersService>(SuperusersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
