import { Test, TestingModule } from '@nestjs/testing';
import { UserboardService } from './userboard.service';

describe('UserboardService', () => {
  let service: UserboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserboardService],
    }).compile();

    service = module.get<UserboardService>(UserboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
