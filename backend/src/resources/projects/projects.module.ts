import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from '../users/entities/user.entity';
import { ProjectsService } from './projects.service';
import { Todo } from '../todos/entities/todo.entity';
import { TodosService } from '../todos/todos.service';
import { UsersService } from '../users/users.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Todo])],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService, TodosService],
})
export class ProjectsModule {}
