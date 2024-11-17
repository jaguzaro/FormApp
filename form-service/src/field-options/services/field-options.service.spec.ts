import { Test, TestingModule } from '@nestjs/testing';
import { FieldOptionsService } from './field-options.service';

describe('FieldOptionsService', () => {
  let service: FieldOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldOptionsService],
    }).compile();

    service = module.get<FieldOptionsService>(FieldOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
