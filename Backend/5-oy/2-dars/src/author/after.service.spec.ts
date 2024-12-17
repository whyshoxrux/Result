import { Test, TestingModule } from '@nestjs/testing';
import { AfterService } from './after.service';

describe('AfterService', () => {
  let service: AfterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfterService],
    }).compile();

    service = module.get<AfterService>(AfterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
