import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { Project } from '../projects/entities/project.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Status } from '../../utils/Constants';
import { User } from '../users/entities/user.entity';

describe('TodosService', () => {
  let service: TodosService;
  let repository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        description: 'Test Todo',
        status: Status.PENDING,
        projectID: '1',
      };
      const project: Project = {
        projectID: '1',
        title: 'Test Project',
        todos: [],
        createdDate: new Date(),
        user: new User(),
      };

      const todo = new Todo();
      todo.description = createTodoDto.description;
      todo.status = createTodoDto.status;
      todo.project = project;

      jest.spyOn(repository, 'create').mockReturnValue(todo);
      jest.spyOn(repository, 'save').mockResolvedValue(todo);

      expect(await service.create(createTodoDto, project)).toEqual(todo);
      expect(repository.create).toHaveBeenCalledWith({
        description: createTodoDto.description,
        status: createTodoDto.status,
        project: project,
      });
      expect(repository.save).toHaveBeenCalledWith(todo);
    });
  });

  describe('findAllByProject', () => {
    it('should return all todos for a project', async () => {
      const projectID = '1';
      const todos = [new Todo(), new Todo()];

      jest.spyOn(repository, 'find').mockResolvedValue(todos);

      expect(await service.findAllByProject(projectID)).toEqual(todos);
      expect(repository.find).toHaveBeenCalledWith({
        where: { project: { projectID } },
      });
    });
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      const todos = [new Todo(), new Todo()];

      jest.spyOn(repository, 'find').mockResolvedValue(todos);

      expect(await service.findAll()).toEqual(todos);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo by ID', async () => {
      const id = '1';
      const todo = new Todo();

      jest.spyOn(repository, 'findOne').mockResolvedValue(todo);

      expect(await service.findOne(id)).toEqual(todo);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { todoID: id },
      });
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const id = '1';
      const updateTodoDto: UpdateTodoDto = {
        description: 'Updated Todo',
        status: Status.COMPLETED,
      };
      const result = { affected: 1, raw: {}, generatedMaps: [] };

      jest.spyOn(repository, 'update').mockResolvedValue(result);

      expect(await service.update(id, updateTodoDto)).toEqual(result);
      expect(repository.update).toHaveBeenCalledWith(id, updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should delete a todo by ID', async () => {
      const id = '1';
      const result = { affected: 1, raw: {} };

      jest.spyOn(repository, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
