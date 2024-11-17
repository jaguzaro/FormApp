import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@MinLength(3)
	username: string;

	@IsString()
	password: string;

	@IsEmail()
	email: string;

	@IsString()
	rol: string;
}
