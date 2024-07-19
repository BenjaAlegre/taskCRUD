import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { DATABASE_PATH } from '../constants/globals.constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  async create(newTask: CreateTaskDto) {
    const tasks = await this.findAll();
    tasks.push(newTask);
    await fs.writeFile(DATABASE_PATH, JSON.stringify(tasks));
  }

  async findAll(): Promise<CreateTaskDto[]> {
    const data = await fs.readFile(DATABASE_PATH);
    const tasks: CreateTaskDto[] = JSON.parse(data.toString());
    return tasks;
  }

  async findOne(id: string): Promise<CreateTaskDto> {
    const tasks = await this.findAll();
    const task = tasks.find((task) => task.id === id);
    if (!task) throw new BadRequestException("The task doesn't exist");
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
