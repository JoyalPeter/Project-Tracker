import { Todo } from '../../todos/entities/todo.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  projectID: string;

  @Column({ unique: true, nullable: false })
  title: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => Todo, (todos) => todos.project, { cascade: true })
  todos: Todo[];
}
