import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TaskStatus {
  todo = 'ToDo',
  inProgress = 'InProgress',
  done = 'Done',
  archived = 'Archived',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.todo,
  })
  status: TaskStatus;
}
