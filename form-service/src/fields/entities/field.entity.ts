import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Fields')
export class Field {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	survey_id: number;

	@Column({ type: 'nvarchar', length: 255 })
	name: string;

	@Column({
		type: 'nvarchar',
		length: 50
	})
	type: 'Number' | 'Text' | 'Date' | 'MultipleChoice' | 'SingleChoice';

	@Column({ type: 'int', default: 0 })
	is_required: number;
}
