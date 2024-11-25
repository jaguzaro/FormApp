import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsInt, IsOptional } from 'class-validator';

export enum FieldType {
	Number = 'Number',
	Text = 'Text',
	Date = 'Date',
	MultipleChoice = 'MultipleChoice',
	SingleChoice = 'SingleChoice'
}

export class CreateFieldDto {
	@IsString()
	@ApiProperty()
	name: string;

	@IsEnum(FieldType)
	@ApiProperty()
	type: FieldType;

	@IsInt()
	@ApiProperty()
	is_required: number;

	@IsNumber()
	@ApiProperty()
	survey_id: number;

	@IsString()
	@IsOptional()
	@ApiProperty()
	options: string;
}
