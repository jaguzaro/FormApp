import { Module } from '@nestjs/common';
import { FieldOptionsController } from './field-options.controller';
import { FieldOptionsService } from './services/field-options.service';

@Module({
  controllers: [FieldOptionsController],
  providers: [FieldOptionsService]
})
export class FieldOptionsModule {}
