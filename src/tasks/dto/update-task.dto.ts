import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
