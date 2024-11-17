import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../entities/survey.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SurveysService {
	constructor(
		@InjectRepository(Survey)
		private surveysRepository: Repository<Survey>,

		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async create(createSurveyDto: CreateSurveyDto, userId): Promise<Survey> {
		const user = await this.usersRepository.findOneBy({ id: userId });

		if (!user) {
			throw new Error('Usuario no encontrado');
		}

		const survey = this.surveysRepository.create({
			...createSurveyDto,
			creator_user: user
		});

		return this.surveysRepository.save(survey);
	}

	async findAll(): Promise<any[]> {
		const surveys = await this.surveysRepository.find({
			select: [
				'id',
				'name',
				'description',
				'date_created',
				'date_updated',
				'enabled'
			],
			relations: {
				creator_user: true,
				updated_user: true
			}
		});

		const surveysWithUsernames = surveys.map(survey => ({
			...survey,
			creator_user: {
				id: survey.creator_user.id,
				username: survey.creator_user.username
			},
			updated_user: survey.updated_user
				? {
						id: survey.updated_user.id,
						username: survey.updated_user.username
					}
				: null
		}));

		return surveysWithUsernames;
	}

	async findOne(id: number): Promise<any> {
		const survey = await this.surveysRepository.findOne({
			where: { id },
			select: [
				'id',
				'name',
				'description',
				'date_created',
				'date_updated',
				'enabled'
			],
			relations: {
				creator_user: true,
				updated_user: true
			}
		});

		if (!survey) {
			throw new Error('Survey not found');
		}

		const surveyWithUsernames = {
			...survey,
			creator_user: {
				id: survey.creator_user.id,
				username: survey.creator_user.username
			},
			updated_user: survey.updated_user
				? {
						id: survey.updated_user.id,
						username: survey.updated_user.username
					}
				: null
		};

		return surveyWithUsernames;
	}

	async update(
		id: number,
		updateSurveyDto: UpdateSurveyDto
	): Promise<Survey> {
		const survey = await this.surveysRepository.findOneBy({ id });
		if (!survey) {
			throw new Error(`Survey with ID ${id} not found`);
		}

		Object.assign(survey, updateSurveyDto);
		survey.date_updated = new Date();

		return this.surveysRepository.save(survey);
	}

	async remove(id: number): Promise<any> {
		const result = await this.surveysRepository.delete(id);

		if (result.affected === 0) {
			throw new Error('Survey not found or already deleted');
		}

		return true;
	}
}
