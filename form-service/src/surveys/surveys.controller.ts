import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Patch,
	Response,
	UseGuards,
	Request,
	Delete
} from '@nestjs/common';
import { SurveysService } from './services/surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guardias';
import { UsersService } from 'src/users/services/users.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('surveys')
export class SurveysController {
	constructor(private readonly surveysService: SurveysService) {}

	@UseGuards(AuthGuard)
	@Post('create-survey')
	@ApiOperation({ summary: 'Create a new survey' })
	@ApiBody({ type: CreateSurveyDto })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Survey successfully created',
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Failed to create survey',
	})
	async create(
		@Body() createSurveyDto: CreateSurveyDto,
		@Response() res,
		@Request() req
	): Promise<Survey> {
		try {
			const survey = await this.surveysService.create(
				createSurveyDto,
				req.user.sub
			);

			return res.status(HttpStatus.CREATED).json({
				code: 'SURVEY_CREATED',
				message: 'Survey has been successfully created.'
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'SURVEY_CREATION_FAILED',
				message: 'An error occurred while creating the survey.',
				error: error.message
			});
		}
	}

	@Get('list-surveys')
	@ApiOperation({ summary: 'List all surveys' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'List of surveys retrieved successfully.',
		type: [Survey], // Indica que devuelve una lista de encuestas
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Failed to retrieve surveys',
	})
	async findAll(@Response() res): Promise<Survey[]> {
		try {
			const surveys = await this.surveysService.findAll();
			const filteredSurveys = surveys.map(survey =>
				Object.fromEntries(
					Object.entries(survey).filter(
						([_, value]) => value !== null
					)
				)
			);
			return res.json({
				code: 'SURVEYS_FOUND',
				message: 'Surveys retrieved successfully.',
				data: filteredSurveys
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'SURVEY_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving surveys.',
				error: error.message
			});
		}
	}

	@Post('find-survey')
	@ApiOperation({ summary: 'Find a survey by ID' })
	@ApiBody({ schema: { type: 'object', properties: { id: { type: 'number' } } } })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Survey found successfully.',
		type: Survey,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Survey not found.',
	})
	async findOne(
		@Body() body: { id: number },
		@Response() res
	): Promise<Survey> {
		try {
			const { id } = body;
			const survey = await this.surveysService.findOne(id);
			const filteredSurvey = Object.fromEntries(
				Object.entries(survey).filter(([_, value]) => value !== null)
			);
			if (!survey) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'SURVEY_NOT_FOUND',
					message: `Survey with ID ${id} not found.`
				});
			}
			return res.json({
				code: 'SURVEY_FOUND',
				message: 'Survey retrieved successfully.',
				data: filteredSurvey
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'SURVEY_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving the survey.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Patch('update-survey')
	@ApiOperation({ summary: 'Update a survey by ID' })
	@ApiBody({ type: UpdateSurveyDto }) // Define el cuerpo de la solicitud
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Survey updated successfully.',
		type: Survey,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Survey not found.',
	})
	async update(
		@Body() body: UpdateSurveyDto & { id: number },
		@Response() res,
		@Request() req
	): Promise<Survey> {
		try {
			const { id, ...updateSurveyDto } = body;

			const updatedSurvey = await this.surveysService.update(
				id,
				updateSurveyDto,
				req.user.sub
			);
			return res.json({
				code: 'SURVEY_UPDATED',
				message: 'Survey updated successfully.',
				data: updatedSurvey
			});
		} catch (error) {
			if (error.message.includes('not found')) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'SURVEY_NOT_FOUND',
					message: error.message
				});
			}
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'SURVEY_UPDATE_FAILED',
				message: 'An error occurred while updating the survey.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Delete('delete-survey')
	@ApiOperation({ summary: 'Delete a survey by ID' })
	@ApiBody({ schema: { type: 'object', properties: { id: { type: 'number' } } } })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Survey successfully deleted.',
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Survey not found.',
	})
	async delete(
		@Body() body: { id: number },
		@Response() res,
		@Request() req
	): Promise<any> {
		try {
			const { id } = body;

			const survey = await this.surveysService.remove(id);

			if (!survey) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'SURVEY_NOT_FOUND',
					message: 'Survey not found.'
				});
			}

			return res.status(HttpStatus.OK).json({
				code: 'SURVEY_DELETED',
				message: 'Survey has been successfully deleted.'
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'SURVEY_DELETION_FAILED',
				message: 'An error occurred while deleting the survey.',
				error: error.message
			});
		}
	}
}
