import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Field } from 'src/fields/entities/field.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { User } from 'src/users/entities/user.entity';
import { SurveyAnswer } from '../../answers/entities/answer.entity';
import { FieldOption } from 'src/field-options/entities/field-option.entity';

export default (): TypeOrmModuleOptions => ({
	type: 'mssql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10) || 1433,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [User, Survey, Field, SurveyAnswer, FieldOption],
	synchronize: false,
	logging: true,
	extra: {
		trustServerCertificate: true
	}
});
