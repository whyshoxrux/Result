import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

const test = new AppService()

describe('AppController', () => {
  it('yigindi test', () => {
    expect(test.sum(2, 3)).toBe(5);
  });
});
