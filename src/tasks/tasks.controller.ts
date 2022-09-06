import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  NotAcceptableException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  private async checkAccessibility(id: number, user: User) {
    if (!user.isAdmin) {
      if (!(await this.tasksService.canAccess(id, user))) {
        throw new ForbiddenException();
      }
    }
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Request() req) {
    return req.user.isAdmin
      ? this.tasksService.findAll()
      : this.tasksService.findByUser(req.user);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    await this.checkAccessibility(+id, req.user);
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.checkAccessibility(+id, req.user);
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    await this.checkAccessibility(+id, req.user);
    return this.tasksService.remove(+id);
  }
}
