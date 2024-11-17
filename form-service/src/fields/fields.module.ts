import { Module } from '@nestjs/common';
import { FieldsController } from './fields.controller';
import { FieldsService } from './services/fields.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Field])],
	controllers: [FieldsController],
	providers: [FieldsService]
})
export class FieldsModule {}
