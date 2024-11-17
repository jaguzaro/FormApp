import { IsString, IsEnum, IsInt } from 'class-validator';
import { FieldType } from './create-field.dto';

export class UpdateFieldDto {
	@IsString()
	name: string;

	@IsEnum(FieldType)
	type: FieldType;

	@IsInt()
	is_required: number;
}
