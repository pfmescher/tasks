import { TaskStatus } from '../entities/task.entity';
import { User } from '../../users/entities/user.entity';

export class CreateTaskDto {
  name: string;
  status: TaskStatus;
  user: User;
}
