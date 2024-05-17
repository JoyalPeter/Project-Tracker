import { Exclude } from 'class-transformer';
import { Project } from '../../projects/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Project, (projects) => projects.user)
  projects: Project[];
}
