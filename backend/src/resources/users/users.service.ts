import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { Exceptions } from '../../utils/Constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findOneByUsername(createUserDto.username);
      if (existingUser) {
        throw new UnprocessableEntityException(Exceptions.USERNAME_UNAVAILABLE);
      }
      const salt = await genSalt();
      createUserDto.password = await hash(createUserDto.password, salt);
      const user = this.userRepo.create(createUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepo.findOne({ where: { userID: id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.userRepo.findOne({ where: { username: username } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepo.find({ relations: ['projects'] });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepo.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
