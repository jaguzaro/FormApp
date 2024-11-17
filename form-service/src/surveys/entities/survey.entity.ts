import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('Surveys')
export class Survey {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'nvarchar', length: 255 })
	name: string;

	@Column({ type: 'nvarchar' })
	description: string;

	@ManyToOne(() => User, user => user.createdSurveys)
	@JoinColumn({ name: 'creator_user' })
	creator_user: User;

	@ManyToOne(() => User, user => user.updatedSurveys, { nullable: true })
	@JoinColumn({ name: 'updated_user' })
	updated_user?: User;

	@CreateDateColumn({
		name: 'date_created',
		type: 'datetime',
		default: () => 'GETDATE()'
	})
	date_created: Date;

	@UpdateDateColumn({
		name: 'date_updated',
		type: 'datetime',
		default: () => 'GETDATE()',
		nullable: true
	})
	date_updated: Date;

	@Column({ type: 'int' })
	enabled: number;
}
