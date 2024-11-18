import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

//dotenv.config();

async function bootstrap() {
	console.log(process.env.DB_HOST);
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: '*',
		methods: 'GET,POST,PUT,DELETE,OPTIONS, PATCH',
		credentials: true,
	  });

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
