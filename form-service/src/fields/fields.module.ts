import { Module } from '@nestjs/common';
import { FieldsController } from './fields.controller';
import { FieldsService } from './services/fields.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { FieldOption } from 'src/field-options/entities/field-option.entity';
import { FieldOptionsService } from 'src/field-options/services/field-options.service';

@Module({
	imports: [TypeOrmModule.forFeature([Field, FieldOption])],
	controllers: [FieldsController],
	providers: [FieldsService, FieldOptionsService]
})
export class FieldsModule {}
