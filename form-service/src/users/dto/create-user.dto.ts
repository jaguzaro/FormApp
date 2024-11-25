import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@MinLength(3)
	@ApiProperty()
	username: string;

	@IsString()
	@ApiProperty()
	password: string;

	@IsEmail()
	@ApiProperty()
	email: string;

	@IsString()
	@ApiProperty()
	rol: string;
}
