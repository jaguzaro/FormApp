import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './services/surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Survey, User])],
	controllers: [SurveysController],
	providers: [SurveysService]
})
export class SurveysModule {}
