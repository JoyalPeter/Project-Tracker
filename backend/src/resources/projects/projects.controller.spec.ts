import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Project } from './entities/project.entity';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let projectsService: ProjectsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useFactory: () => ({
            create: jest.fn(),
            findAllByUser: jest.fn(),
            searchProject: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
          }),
        },
        {
          provide: UsersService,
          useFactory: () => ({
            findOne: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    projectsService = module.get<ProjectsService>(ProjectsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new project', async () => {
      const createProjectDto: CreateProjectDto = {
        title: 'New Project',
        userID: '1',
      };
      const mockUser: User = {
        userID: '1',
        username: 'Test User',
        password: 'password',
        projects: [],
      };
      const mockProject: Project = {
        projectID: '1',
        title: 'Test',
        createdDate: new Date(),
        user: new User(),
        todos: [],
      };

      (usersService.findOne as jest.Mock).mockResolvedValue(mockUser);
      (projectsService.create as jest.Mock).mockResolvedValue(mockProject);

      const result = await controller.create(createProjectDto);
      expect(result).toEqual(mockProject);
    });
  });

  describe('findAllByUser', () => {
    it('should find all projects by user', async () => {
      const userID = '1';
      const projects = [
        {
          projectID: '1',
          title: 'Test',
          createdDate: new Date(),
          user: new User(),
          todos: [],
        },
      ];

      (projectsService.findAllByUser as jest.Mock).mockResolvedValue(projects);

      const result = await controller.findAllByUser(userID);
      expect(result).toEqual(projects);
    });
  });

  describe('searchProject', () => {
    it('should search projects', async () => {
      const searchKey = 'search';
      const userID = '1';
      const projects = [
        {
          projectID: '1',
          title: 'Test',
          createdDate: new Date(),
          user: new User(),
          todos: [],
        },
      ];

      (projectsService.searchProject as jest.Mock).mockResolvedValue(projects);

      const result = await controller.searchProject(searchKey, userID);
      expect(result).toEqual(projects);
    });
  });

  describe('findOne', () => {
    it('should find a project by ID', async () => {
      const id = '1';
      const project = {
        projectID: '1',
        title: 'Test',
        createdDate: new Date(),
        user: new User(),
        todos: [],
      };

      (projectsService.findOne as jest.Mock).mockResolvedValue(project);

      const result = await controller.findOne(id);
      expect(result).toEqual(project);
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const id = '1';
      const updateProjectDto: UpdateProjectDto = { title: 'Updated' };
      const project = {
        projectID: '1',
        title: 'Updated',
        createdDate: new Date(),
        user: new User(),
        todos: [],
      };

      (projectsService.update as jest.Mock).mockResolvedValue(project);

      const result = await controller.update(id, updateProjectDto);
      expect(result).toEqual(project);
    });
  });

  describe('remove', () => {
    it('should remove a project', async () => {
      const id = '1';

      (projectsService.remove as jest.Mock).mockResolvedValue({});

      const result = await controller.remove(id);
      expect(result).toEqual({});
    });
  });

  describe('findAll', () => {
    it('should find all projects', async () => {
      const projects = [];

      (projectsService.findAll as jest.Mock).mockResolvedValue(projects);

      const result = await controller.findAll();
      expect(result).toEqual(projects);
    });
  });
});
