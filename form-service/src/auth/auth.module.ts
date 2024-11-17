import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true
		}),
		TypeOrmModule.forFeature([User]),
		UsersModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWTSECRET,
			signOptions: { expiresIn: '300s' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, UsersService],
	exports: [AuthService]
})
export class AuthModule {}
