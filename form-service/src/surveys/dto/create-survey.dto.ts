import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateSurveyDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNotEmpty()
	@IsInt()
	enabled: number;
}
