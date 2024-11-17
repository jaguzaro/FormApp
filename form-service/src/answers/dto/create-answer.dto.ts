import { IsString, IsInt } from 'class-validator';

export class CreateAnswerDto {
	@IsInt()
	field_id: number;

	@IsString()
	response: string;
}