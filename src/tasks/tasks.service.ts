import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async canAccess(id: number, user: User): Promise<boolean> {
    return (
      user.isAdmin ||
      (await this.tasksRepository.find({
        where: {
          user,
          id,
        },
      })) !== null
    );
  }

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.save(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findByUser(user: User) {
    console.log(JSON.stringify(user));
    return this.tasksRepository.find({
      where: {
        user,
        status: Not(TaskStatus.archived),
      },
    });
  }

  findOne(id: number) {
    return this.tasksRepository.findBy({
      id,
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete({ id });
  }
}
