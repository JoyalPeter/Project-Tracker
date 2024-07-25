import { Status } from '../../../utils/Constants';
import { Project } from '../../projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  todoID: string;

  @Column()
  description: string;

  @Column()
  status: Status;

  @Column()
  deleted: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Project, (project) => project.todos)
  @JoinColumn({ name: 'project' })
  project: Project;
}
