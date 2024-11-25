import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from '../entities/field.entity';
import { Repository } from 'typeorm';
import { CreateFieldDto } from '../dto/create-field.dto';
import { UpdateFieldDto } from '../dto/update-field.dto';

@Injectable()
export class FieldsService {
	constructor(
		@InjectRepository(Field)
		private fieldsRepository: Repository<Field>
	) {}

	async create(createFieldDto: CreateFieldDto): Promise<Field> {
		const field = this.fieldsRepository.create(createFieldDto);
		return this.fieldsRepository.save(field);
	}

	async findAll(): Promise<Field[]> {
		const result = await this.fieldsRepository.query(`
			SELECT 
			  f.id,
			  f.survey_id,
			  f.name,
			  f.type,
			  f.is_required,
			  fo.id AS option_id,
			  fo.response AS option_response
			FROM Fields f
			LEFT JOIN Field_options fo ON f.id = fo.field_id`);
		
		return result;
	}

	async find(id: number): Promise<Field[]> {
		const result = await this.fieldsRepository.query(
			`
			SELECT 
				f.id,
				f.survey_id,
				f.name,
				f.type,
				f.is_required,
				fo.id AS option_id,
				fo.response AS option_response
			FROM Fields f
			LEFT JOIN Field_options fo ON f.id = fo.field_id
			WHERE f.survey_id = ${id}
			`, 
			[id]
		);
		console.log(result)
	
		if (result.length === 0) {
			throw new Error(`Field with survey_id ${id} not found`);
		}
		
		return result;
	}

	async update(id: number, updateFieldDto: UpdateFieldDto): Promise<Field> {
		const field = await this.fieldsRepository.findOne({
			where: { id: id }
		});
		if (!field) {
			throw new Error(`Field with ID ${id} not found`);
		}

		Object.assign(field, updateFieldDto);
		return this.fieldsRepository.save(field);
	}

	// Eliminar un Field por su ID
	async remove(id: number): Promise<boolean> {
		const result = await this.fieldsRepository.delete(id);
		if (result.affected === 0) {
			throw new Error(`Field with ID ${id} not found or already deleted`);
		}
		return true;
	}
}
