import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Project])],
  controllers: [TodosController],
  providers: [TodosService, ProjectsService],
})
export class TodosModule {}
