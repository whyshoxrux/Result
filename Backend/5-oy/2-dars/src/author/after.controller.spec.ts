import { Test, TestingModule } from '@nestjs/testing';
import { AfterController } from './after.controller';
import { AfterService } from './after.service';

describe('AfterController', () => {
  let controller: AfterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfterController],
      providers: [AfterService],
    }).compile();

    controller = module.get<AfterController>(AfterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
