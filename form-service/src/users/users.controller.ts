import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Response
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('register')
	async create(
		@Body() createUserDto: CreateUserDto,
		@Response() res
	): Promise<User> {
		try {
			const { username, password, email, rol } = createUserDto;

			const existUser = await this.usersService.findOne(username);
			if (existUser) {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					code: 'USER_CREATION_FAILED',
					message: 'existing user name, try with a different one'
				});
			}

			const saltRounds = parseInt(process.env.SALT_ROUNDS);
			const hash = await bcrypt.hash(password, saltRounds);
			const user = await this.usersService.create({
				username,
				password: hash,
				email,
				rol
			});
			return res.json({
				code: 'USER_CREATED',
				message: 'User has been successfully created.',
				data: {
					username: user?.username,
					email: user?.email,
					rol: user?.rol
				}
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'USER_CREATION_FAILED',
				message: 'An error occurred while creating the user.',
				error: error.message
			});
		}
	}

	@Post('login')
	async loginUser(@Body() loginUserDto: LoginUserDto, @Response() res) {
		try {
			const { username, password } = loginUserDto;
			const user = await this.usersService.findOne(username);
			if (!user) {
				return res.json({
					code: 'USER_NOT_FOUND',
					message: 'User not found, verify user.'
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				return res.json({
					code: 'USER_LOGED',
					message: 'User has been successfully login.',
					data: {
						username: user?.username,
						email: user?.email,
						rol: user?.rol
					}
				});
			} else {
				return res.status(HttpStatus.NOT_ACCEPTABLE).json({
					code: 'LOGIN_FAILED',
					message: 'Credentials error, try again.'
				});
			}
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'LOGIN_FAILED',
				message: 'An error occurred while login user.',
				error: error.message
			});
		}
	}
}
