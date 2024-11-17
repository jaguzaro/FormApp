import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './common/config/database.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SurveysModule } from './surveys/surveys.module';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.module';
import { AnswersModule } from './answers/answers.module';
import { FieldOptionsModule } from './field-options/field-options.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			load: [databaseConfig]
		}),
		TypeOrmModule.forRootAsync({
			useFactory: databaseConfig
		}),
		UsersModule,
		SurveysModule,
		AuthModule,
		FieldsModule,
		AnswersModule,
		FieldOptionsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
