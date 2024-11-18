import { Module } from '@nestjs/common';
import { FieldOptionsController } from './field-options.controller';
import { FieldOptionsService } from './services/field-options.service';
import { FieldOption } from './entities/field-option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FieldOption])],
  controllers: [FieldOptionsController],
  providers: [FieldOptionsService]
})
export class FieldOptionsModule {}
