import { IsString, IsEnum, IsNumber, IsInt } from 'class-validator';

export enum FieldType {
	Number = 'Number',
	Text = 'Text',
	Date = 'Date',
	MultipleChoice = 'MultipleChoice',
	SingleChoice = 'SingleChoice'
}

export class CreateFieldDto {
	@IsString()
	name: string;

	@IsEnum(FieldType)
	type: FieldType;

	@IsInt()
	is_required: number;

	@IsNumber()
	survey_id: number;
}
