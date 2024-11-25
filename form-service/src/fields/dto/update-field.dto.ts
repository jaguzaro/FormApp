import { IsString, IsEnum, IsInt } from 'class-validator';
import { FieldType } from './create-field.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFieldDto {
	@IsString()
	@ApiProperty()
	name: string;

	@IsEnum(FieldType)
	@ApiProperty()
	type: FieldType;

	@IsInt()
	@ApiProperty()
	is_required: number;
}
