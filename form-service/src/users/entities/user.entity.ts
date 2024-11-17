import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Survey } from '../../surveys/entities/survey.entity';

@Entity('Users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'nvarchar', length: 15 })
	username: string;

	@Column({ type: 'nvarchar', length: 100 })
	password: string;

	@Column({ type: 'nvarchar', length: 20 })
	email: string;

	@Column({ type: 'nvarchar', length: 10 })
	rol: string;

	@OneToMany(() => Survey, survey => survey.creator_user)
	createdSurveys: Survey[];

	@OneToMany(() => Survey, survey => survey.updated_user)
	updatedSurveys: Survey[];
}
