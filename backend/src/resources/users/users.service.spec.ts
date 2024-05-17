import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test',
        password: 'testpass',
      };
      const user = { userID: '1', ...createUserDto };

      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      jest.spyOn(repo, 'create').mockReturnValue(user as any);
      jest.spyOn(repo, 'save').mockResolvedValue(user as any);

      const result = await service.create(createUserDto);

      expect(result).toEqual(user);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { username: createUserDto.username },
      });
      expect(repo.create).toHaveBeenCalledWith(createUserDto);
      expect(repo.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findOne', () => {
    it('should find one user by id', async () => {
      const user = { userID: '1', username: 'test', password: 'testpass' };

      jest.spyOn(repo, 'findOne').mockResolvedValue(user as any);

      expect(await service.findOne('1')).toEqual(user);
    });
  });

  describe('findOneByUsername', () => {
    it('should find one user by username', async () => {
      const user = { userID: '1', username: 'test', password: 'testpass' };

      jest.spyOn(repo, 'findOne').mockResolvedValue(user as any);

      expect(await service.findOneByUsername('test')).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users = [
        { userID: '1', username: 'test1', password: 'testpass' },
        { userID: '2', username: 'test2', password: 'testpass' },
      ];

      jest.spyOn(repo, 'find').mockResolvedValue(users as any);

      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updated' };
      const result = { affected: 1 };

      jest.spyOn(repo, 'update').mockResolvedValue(result as any);

      expect(await service.update('1', updateUserDto)).toEqual(result);
      expect(repo.update).toHaveBeenCalledWith('1', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      expect(service.remove(1)).toEqual('This action removes a #1 user');
    });
  });
});
