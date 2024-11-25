import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
	@IsString()
	@MinLength(3)
	@ApiProperty()
	username: string;

	@IsString()
	@MinLength(6)
	@ApiProperty()
	password: string;
}
