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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('answers')
export class AnswersController {
	constructor(private readonly answersService: AnswersService) {}

	@Post('create-answer')
	@ApiOperation({ summary: 'Create answers' })
	@ApiBody({
		description: 'List of answers to create',
		type: [CreateAnswerDto],
	})
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Answers have been successfully created.',
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'An error occurred while creating the answers.',
	})
	async create(
		@Body() createAnswerDto: CreateAnswerDto[],
		@Response() res
	): Promise<SurveyAnswer> {
		try {
			for (const answer of createAnswerDto) {
			  await this.answersService.create({
				field_id: answer.field_id,
				response: answer.response.toString(),
			  });
			}
		
			return res.status(HttpStatus.CREATED).json({
			  code: 'ANSWER_CREATED',
			  message: 'Answers have been successfully created.',
			});
		  } catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			  code: 'ANSWER_CREATION_FAILED',
			  message: 'An error occurred while creating the answers.',
			  error: error.message,
			});
		  }
	}

	@UseGuards(AuthGuard)
	@Get('list-answers')
	@ApiOperation({ summary: 'List all answers' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Answers retrieved successfully.',
		type: [SurveyAnswer],
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'An error occurred while retrieving answers.',
	})
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

	@UseGuards(AuthGuard)
	@Post('find-answer')
	@ApiOperation({ summary: 'Find a specific answer by ID' })
	@ApiBody({
		description: 'ID of the answer to find',
		type: Object,
		examples: {
			default: {
				summary: 'Example payload',
				value: { id: 1 },
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Answer retrieved successfully.',
		type: SurveyAnswer,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Answer with the specified ID not found.',
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'An error occurred while retrieving the answer.',
	})
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