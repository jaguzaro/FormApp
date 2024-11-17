import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Field_options')
export class FieldOption {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	field_id: number;

	@Column({ type: 'nvarchar', length: 255 })
	response: string;
}
