import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateOptionsDto {
	@IsInt()
	@ApiProperty()
	@ApiProperty()
	field_id: number;

	@IsString()
	@ApiProperty()
	@ApiProperty()
	response: string;
}