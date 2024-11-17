import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyAnswer } from '../entities/answer.entity';
import { CreateAnswerDto } from '../dto/create-answer.dto';

@Injectable()
export class AnswersService {
	constructor(
		@InjectRepository(SurveyAnswer)
		private readonly answersRepository: Repository<SurveyAnswer>
	) {}

	async create(createAnswerDto: CreateAnswerDto): Promise<SurveyAnswer> {
		const answer = this.answersRepository.create(createAnswerDto);
		return this.answersRepository.save(answer);
	}

	async findAll(): Promise<SurveyAnswer[]> {
		return this.answersRepository.find();
	}

	async findOne(id: number): Promise<SurveyAnswer> {
		const answer = await this.answersRepository.findOne({
			where: { id: id }
		});
		if (!answer) {
			throw new NotFoundException(`Answer with ID ${id} not found`);
		}
		return answer;
	}
}
