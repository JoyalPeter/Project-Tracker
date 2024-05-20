import { Module } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { Project } from '../projects/entities/project.entity';
import { ProjectsService } from '../projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Project])],
  controllers: [TodosController],
  providers: [TodosService, ProjectsService],
})
export class TodosModule {}
