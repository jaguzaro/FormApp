import {
	Body,
	Controller,
	Post,
	UseGuards,
	Response,
	HttpStatus,
	Get,
	Patch,
	Delete,
} from '@nestjs/common';
import { FieldOptionsService } from './services/field-options.service';
import { AuthGuard } from 'src/auth/auth.guardias';
import { CreateOptionsDto } from './dto/create-options.dto';
import { FieldOption } from './entities/field-option.entity';

@Controller('field-options')
export class FieldOptionsController {
	constructor(private readonly fieldOptionsService: FieldOptionsService) {}

	@UseGuards(AuthGuard)
	@Post('create-field-option')
	async create(
		@Body() createOptionsDto: CreateOptionsDto,
		@Response() res
	): Promise<FieldOption> {
		try {
			const fieldOption =
				await this.fieldOptionsService.create(createOptionsDto);

			return res.status(HttpStatus.CREATED).json({
				code: 'FIELD_OPTION_CREATED',
				message: 'Field option has been successfully created.'
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_OPTION_CREATION_FAILED',
				message: 'An error occurred while creating the field option.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Get('list-field-options')
	async findAll(@Response() res): Promise<FieldOption[]> {
		try {
			const fieldOptions = await this.fieldOptionsService.findAll();
			return res.json({
				code: 'FIELD_OPTIONS_FOUND',
				message: 'Field options retrieved successfully.',
				data: fieldOptions
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_OPTION_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving field options.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Get('find-field-option')
	async findOne(
		@Body() body: { id: number },
		@Response() res
	): Promise<FieldOption> {
		try {
			const { id } = body;
			const fieldOption = await this.fieldOptionsService.findOne(id);
			if (!fieldOption) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'FIELD_OPTION_NOT_FOUND',
					message: `Field option with ID ${id} not found.`
				});
			}
			return res.json({
				code: 'FIELD_OPTION_FOUND',
				message: 'Field option retrieved successfully.',
				data: fieldOption
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_OPTION_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving the field option.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Patch('update-field-option')
	async update(
		@Body() body: CreateOptionsDto & { id: number },
		@Response() res
	): Promise<FieldOption> {
		try {
			const { id, ...updateOptionsDto } = body;
			const updatedFieldOption = await this.fieldOptionsService.update(
				id,
				updateOptionsDto
			);
			return res.json({
				code: 'FIELD_OPTION_UPDATED',
				message: 'Field option updated successfully.',
				data: updatedFieldOption
			});
		} catch (error) {
			if (error.message.includes('not found')) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'FIELD_OPTION_NOT_FOUND',
					message: error.message
				});
			}
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_OPTION_UPDATE_FAILED',
				message: 'An error occurred while updating the field option.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Delete('delete-field-option')
	async delete(@Body() body: { id: number }, @Response() res): Promise<any> {
		try {
			const { id } = body;
			const fieldOption = await this.fieldOptionsService.remove(id);

			if (!fieldOption) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'FIELD_OPTION_NOT_FOUND',
					message: 'Field option not found.'
				});
			}

			return res.status(HttpStatus.OK).json({
				code: 'FIELD_OPTION_DELETED',
				message: 'Field option has been successfully deleted.'
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_OPTION_DELETION_FAILED',
				message: 'An error occurred while deleting the field option.',
				error: error.message
			});
		}
	}
}
