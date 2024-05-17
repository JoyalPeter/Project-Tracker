import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ProjectsService } from '../projects/projects.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly projectsService: ProjectsService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const project = await this.projectsService.findOne(createTodoDto.projectID);
    return this.todosService.create(createTodoDto, project);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':projectID/all')
  async findAllByProject(@Param('projectID') projectID: string) {
    return await this.todosService.findAllByProject(projectID);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todosService.update(id, updateTodoDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todosService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.todosService.findAll();
  }
}
