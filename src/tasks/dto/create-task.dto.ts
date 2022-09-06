import { TaskStatus } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}
