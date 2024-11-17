import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Answers')
export class SurveyAnswer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	field_id: number;

	@Column()
	response: string;
}
