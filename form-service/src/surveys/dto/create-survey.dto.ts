import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateSurveyDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	name: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	description?: string;

	@IsNotEmpty()
	@IsInt()
	@ApiProperty()
	enabled: number;
}
