import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((u) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pass, ...rest } = u;
      return rest;
    });
  }

  findByName(name: string) {
    return this.usersRepository.findOneBy({ name });
  }

  findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
