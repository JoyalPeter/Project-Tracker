import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, project: Project) {
    try {
      const todo = this.todoRepo.create({
        description: createTodoDto.description,
        status: createTodoDto.status,
        project: project,
      });
      return await this.todoRepo.save(todo);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByProject(projectID: string) {
    try {
      return await this.todoRepo.find({
        where: { project: { projectID: projectID } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.todoRepo.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.todoRepo.findOne({ where: { todoID: id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todoRepo.update(id, updateTodoDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.todoRepo.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
