import { Test, TestingModule } from '@nestjs/testing';
import { FieldOptionsController } from './field-options.controller';

describe('FieldOptionsController', () => {
  let controller: FieldOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldOptionsController],
    }).compile();

    controller = module.get<FieldOptionsController>(FieldOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
