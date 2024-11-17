import { IsString, IsInt } from 'class-validator';

export class CreateOptionsDto {
	@IsInt()
	field_id: number;

	@IsString()
	response: string;
}