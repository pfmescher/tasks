import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean')
  isAdmin: boolean;

  @Column('text')
  name: string;

  @Column('text')
  pass: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
