import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './services/answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from '../fields/entities/field.entity';
import { SurveyAnswer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyAnswer])],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
