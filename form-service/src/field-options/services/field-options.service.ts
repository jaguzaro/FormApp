import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldOption } from '../entities/field-option.entity';
import { CreateOptionsDto } from '../dto/create-options.dto';

@Injectable()
export class FieldOptionsService {
	constructor(
		@InjectRepository(FieldOption)
		private readonly fieldOptionsRepository: Repository<FieldOption>
	) {}

	async create(createFieldOptionDto: CreateOptionsDto): Promise<FieldOption> {
		const fieldOption =
			this.fieldOptionsRepository.create(createFieldOptionDto);
		return this.fieldOptionsRepository.save(fieldOption);
	}

	async findAll(): Promise<FieldOption[]> {
		return this.fieldOptionsRepository.find();
	}

	async findOne(id: number): Promise<FieldOption> {
		const fieldOption = await this.fieldOptionsRepository.findOne({
			where: { field_id: id }
		});
		if (!fieldOption) {
			throw new NotFoundException(`FieldOption with ID ${id} not found`);
		}
		return fieldOption;
	}

	async update(
		id: number,
		updateFieldOptionDto: Partial<CreateOptionsDto>
	): Promise<FieldOption> {
		const fieldOption = await this.fieldOptionsRepository.findOneBy({ id });
		if (!fieldOption) {
			throw new Error(`FieldOption with ID ${id} not found`);
		}

		Object.assign(fieldOption, updateFieldOptionDto);

		return this.fieldOptionsRepository.save(fieldOption);
	}

	async remove(id: number): Promise<boolean> {
		const result = await this.fieldOptionsRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`FieldOption with ID ${id} not found`);
		}

		return true;
	}
}
