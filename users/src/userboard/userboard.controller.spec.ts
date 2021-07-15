import { Test, TestingModule } from '@nestjs/testing';
import { UserboardController } from './userboard.controller';

describe('UserboardController', () => {
  let controller: UserboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserboardController],
    }).compile();

    controller = module.get<UserboardController>(UserboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
