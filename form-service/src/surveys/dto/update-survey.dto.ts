import { IsOptional, IsString, IsInt, MaxLength } from 'class-validator';

export class UpdateSurveyDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsInt()
	updated_user: number;

	@IsOptional()
	@IsInt()
	enabled?: number;
}
