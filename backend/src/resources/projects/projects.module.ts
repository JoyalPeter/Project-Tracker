import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { TodosService } from '../todos/todos.service';
import { Todo } from '../todos/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Todo])],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService, TodosService],
})
export class ProjectsModule {}
