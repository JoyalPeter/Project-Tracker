import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from '../users/entities/user.entity';
import { TodosService } from '../todos/todos.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    private readonly todoService: TodosService,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      const project = this.projectRepo.create({
        title: createProjectDto.title,
        user: user,
      });
      return await this.projectRepo.save(project);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByUser(userID: string) {
    try {
      return await this.projectRepo.find({
        where: { user: { userID: userID } },
        relations: ['todos'],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.projectRepo.findOne({
        where: { projectID: id },
        relations: ['todos'],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.projectRepo.update(id, updateProjectDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchProject(searchKey: string, userID: string) {
    try {
      return await this.projectRepo.find({
        where: { user: { userID: userID }, title: Like(`%${searchKey}%`) },
        relations: ['todos'],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.projectRepo.find({ relations: ['todos'] });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    try {
      const project = await this.findOne(id)

      project.todos.forEach(async (todo) => {
        await this.todoService.remove(todo.todoID);
      });

      return await this.projectRepo.delete(project);
    } catch (error) {
      throw new Error(error);
    }
  }
}
