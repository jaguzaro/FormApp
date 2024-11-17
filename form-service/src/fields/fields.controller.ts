import {
	Body,
	Controller,
	Post,
	UseGuards,
	Response,
	Request,
	HttpStatus,
	Get,
	Patch,
	Delete
} from '@nestjs/common';
import { FieldsService } from './services/fields.service';
import { AuthGuard } from 'src/auth/auth.guardias';
import { CreateFieldDto } from './dto/create-field.dto';
import { Field } from './entities/field.entity';
import { UpdateFieldDto } from './dto/update-field.dto';

@Controller('fields')
export class FieldsController {
	constructor(private readonly fieldsService: FieldsService) {}

	@UseGuards(AuthGuard)
	@Post('create-field')
	async create(
		@Body() createFieldDto: CreateFieldDto,
		@Response() res
	): Promise<Field> {
		try {
			const field = await this.fieldsService.create(createFieldDto);

			return res.status(HttpStatus.CREATED).json({
				code: 'FIELD_CREATED',
				message: 'Field has been successfully created.'
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_CREATION_FAILED',
				message: 'An error occurred while creating the field.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Get('list-fields')
	async findAll(@Response() res): Promise<Field[]> {
		try {
			const fields = await this.fieldsService.findAll();
			return res.json({
				code: 'FIELDS_FOUND',
				message: 'Fields retrieved successfully.',
				data: fields
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving fields.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Post('find-field')
	async findOne(
		@Body() body: { id: number },
		@Response() res
	): Promise<Field> {
		try {
			const { id } = body;
			const field = await this.fieldsService.findOne(id);
			if (!field) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'FIELD_NOT_FOUND',
					message: `Field with ID ${id} not found.`
				});
			}
			return res.json({
				code: 'FIELD_FOUND',
				message: 'Field retrieved successfully.',
				data: field
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_RETRIEVAL_FAILED',
				message: 'An error occurred while retrieving the field.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Patch('update-field')
	async update(
		@Body() body: UpdateFieldDto & { id: number },
		@Response() res
	): Promise<Field> {
		try {
			const { id, ...updateFieldDto } = body;
			const updatedField = await this.fieldsService.update(
				id,
				updateFieldDto
			);
			return res.json({
				code: 'FIELD_UPDATED',
				message: 'Field updated successfully.',
				data: updatedField
			});
		} catch (error) {
			if (error.message.includes('not found')) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'FIELD_NOT_FOUND',
					message: error.message
				});
			}
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_UPDATE_FAILED',
				message: 'An error occurred while updating the field.',
				error: error.message
			});
		}
	}

	@UseGuards(AuthGuard)
	@Delete('delete-field')
	async delete(@Body() body: { id: number }, @Response() res): Promise<any> {
		try {
			const { id } = body;
			const field = await this.fieldsService.remove(id);

			if (!field) {
				return res.status(HttpStatus.NOT_FOUND).json({
					code: 'FIELD_NOT_FOUND',
					message: 'Field not found.'
				});
			}

			return res.status(HttpStatus.OK).json({
				code: 'FIELD_DELETED',
				message: 'Field has been successfully deleted.'
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: 'FIELD_DELETION_FAILED',
				message: 'An error occurred while deleting the field.',
				error: error.message
			});
		}
	}
}
