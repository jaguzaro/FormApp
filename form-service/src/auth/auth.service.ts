import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async signIn(
		username: string,
		pass: string
	): Promise<{ code: string; access_token: string }> {
		const user = await this.usersService.findOne(username);
		const isMatch = await bcrypt.compare(pass, user.password);

		if (!isMatch) {
			throw new UnauthorizedException();
		}

		const payload = {
			sub: user.id,
			username: user.username,
			email: user.email
		};

		return {
			code: 'USER_LOGED',
			access_token: await this.jwtService.signAsync(payload)
		};
	}
}
