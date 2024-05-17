import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { TodosService } from '../todos/todos.service';
import { User } from '../users/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectRepository: Repository<Project>;
  let todosService: TodosService;

  const mockProject: Project = {
    projectID: '1',
    title: 'Test Project',
    createdDate: new Date(),
    user: null,
    todos: [],
  };

  const mockUser: User = {
    userID: '1',
    username: 'testuser',
    password: 'password',
    projects: [],
  };

  const mockCreateProjectDto: CreateProjectDto = {
    title: 'Test Project',
    userID: '1',
  };

  const mockUpdateProjectDto: UpdateProjectDto = {
    title: 'Updated Project',
  };

  const mockProjectRepository = {
    create: jest.fn().mockResolvedValue(mockProject),
    save: jest.fn().mockResolvedValue(mockProject),
    find: jest.fn().mockResolvedValue([mockProject]),
    findOne: jest.fn().mockResolvedValue(mockProject),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  const mockTodosService = {
    remove: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        TodosService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepository,
        },
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a project', async () => {
      const result = await service.create(mockCreateProjectDto, mockUser);
      expect(result).toEqual(mockProject);
    });
  });

  describe('findAllByUser', () => {
    it('should return an array of projects', async () => {
      const result = await service.findAllByUser('1');
      expect(result).toEqual([mockProject]);
    });
  });

  describe('findOne', () => {
    it('should return a project by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockProject);
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const result = await service.update('1', mockUpdateProjectDto);
      expect(result).toEqual(true);
    });
  });

  describe('searchProject', () => {
    it('should return an array of projects matching the search key', async () => {
      const result = await service.searchProject('test', '1');
      expect(result).toEqual([mockProject]);
    });
  });

  describe('findAll', () => {
    it('should return an array of all projects', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProject]);
    });
  });

  describe('remove', () => {
    it('should remove a project and its associated todos', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(true);
    });
  });
});
