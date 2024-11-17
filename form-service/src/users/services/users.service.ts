import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = this.usersRepository.create(createUserDto);
		return this.usersRepository.save(user);
	}

	async findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	async findOne(username: string): Promise<User> {
		return this.usersRepository.findOneBy({ username });
	}
}