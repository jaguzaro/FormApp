import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, MaxLength } from 'class-validator';

export class UpdateSurveyDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	@ApiProperty()
	name?: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	description?: string;

	@IsOptional()
	@IsInt()
	@ApiProperty()
	enabled?: number;
}
