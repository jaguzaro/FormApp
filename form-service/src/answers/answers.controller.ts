import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Response,
	UseGuards,
} from '@nestjs/common';
import { AnswersService } from './services/answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { SurveyAnswer } from './entities/answer.entity';
import { AuthGuard } from 'src/auth/auth.guardias';

@Controller('answers')
export class AnswersController {
	constructor(private readonly answersService: AnswersService) {}

	@UseGuards(AuthGuard)
	@Post('create-answer')
	async create(
		@Body() createAnswerDto: CreateAnswerDto,
		@Response() res
	): Promise<SurveyAnswer> {
		try {
			const answer = await this.answersService.create(createAnswerDto);
			return res.status(HttpStatus.CREATED).json({
				code: 'ANSWER_CREATED',
				message: 'Answer has been successfully created.',
				data: answer
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'ANSWER_CREATION_FAILED',
				message: 'An error occurred while creating the answer.',
				error: error.message
			});
		}
	}

	@Get('list-answers')
	async findAll(@Response() res): Promise<SurveyAnswer[]> {
		try {
			const answers = await this.answersService.findAll();
			return res.json({
				code: 'ANSWERS_FOUND',
				message: 'Answers retrieved successfully.',
				data: answers
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'ANSWER_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving answers.',
				error: error.message
			});
		}
	}

	@Post('find-answer')
	async findOne(
		@Body() body: { id: number },
		@Response() res
	): Promise<SurveyAnswer> {
		try {
			const { id } = body;
			const answer = await this.answersService.findOne(id);
			if (!answer) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'ANSWER_NOT_FOUND',
					message: `Answer with ID ${id} not found.`
				});
			}
			return res.json({
				code: 'ANSWER_FOUND',
				message: 'Answer retrieved successfully.',
				data: answer
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'ANSWER_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving the answer.',
				error: error.message
			});
		}
	}
}