import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Form App')
		.setDescription('Endpoints used on Form App')
		.setVersion('1.0')
		.addTag('formapp')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory)

	app.enableCors({
		origin: '*',
		methods: 'GET,POST,PUT,DELETE,OPTIONS, PATCH',
		credentials: true,
	  });

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
