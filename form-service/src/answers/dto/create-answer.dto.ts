import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateAnswerDto {
	@IsInt()
	@ApiProperty()
	field_id: number;

	@IsString()
	@ApiProperty()
	response: string;
}