import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { ProjectsService } from '../projects/projects.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Project } from '../projects/entities/project.entity';
import { Todo } from './entities/todo.entity';
import { Status } from '../../utils/Constants';
import { User } from '../users/entities/user.entity';

describe('TodosController', () => {
  let controller: TodosController;
  let todosService: TodosService;
  let projectsService: ProjectsService;

  const mockTodo: Todo = {
    todoID: '1',
    description: 'Test Todo',
    status: Status.PENDING,
    createdDate: new Date(),
    updatedDate: new Date(),
    project: null,
  };

  const mockProject: Project = {
    projectID: '1',
    title: 'Test Project',
    todos: [mockTodo],
    createdDate: new Date(),
    user: new User(),
  };

  const mockTodosService = {
    create: jest.fn().mockResolvedValue(mockTodo),
    findAllByProject: jest.fn().mockResolvedValue([mockTodo]),
    findOne: jest.fn().mockResolvedValue(mockTodo),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockTodo, description: 'Updated Todo' }),
    remove: jest.fn().mockResolvedValue(mockTodo),
    findAll: jest.fn().mockResolvedValue([mockTodo]),
  };

  const mockProjectsService = {
    findOne: jest.fn().mockResolvedValue(mockProject),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: TodosService, useValue: mockTodosService },
        { provide: ProjectsService, useValue: mockProjectsService },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const createTodoDto: CreateTodoDto = {
        description: 'Test Todo',
        status: Status.PENDING,
        projectID: '1',
      };
      const result = await controller.create(createTodoDto);
      expect(result).toEqual(mockTodo);
      expect(projectsService.findOne).toHaveBeenCalledWith('1');
      expect(todosService.create).toHaveBeenCalledWith(
        createTodoDto,
        mockProject,
      );
    });
  });

  describe('findAllByProject', () => {
    it('should return an array of todos', async () => {
      const result = await controller.findAllByProject('1');
      expect(result).toEqual([mockTodo]);
      expect(todosService.findAllByProject).toHaveBeenCalledWith('1');
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockTodo);
      expect(todosService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        description: 'Updated Todo',
        status: Status.COMPLETED,
      };
      const result = await controller.update('1', updateTodoDto);
      expect(result).toEqual({ ...mockTodo, description: 'Updated Todo' });
      expect(todosService.update).toHaveBeenCalledWith('1', updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual(mockTodo);
      expect(todosService.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockTodo]);
      expect(todosService.findAll).toHaveBeenCalled();
    });
  });
});
