import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import { DATABASE_PATH } from '../constants/globals.constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const file = JSON.parse(await fs.readFile(DATABASE_PATH).toString());

    const index = file.findIndex((task) => task.id == id);
    file[index] = { ...file[index], ...updateTaskDto };

    await fs.writeFile(DATABASE_PATH, JSON.stringify(file));
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    const file = JSON.parse(await fs.readFile(DATABASE_PATH).toString());

    const index = file.findIndex((task) => task.id == id);
    file.splice(index, 1);

    await fs.writeFile(DATABASE_PATH, JSON.stringify(file));

    return `This action removes a #${id} task`;
  }
}
