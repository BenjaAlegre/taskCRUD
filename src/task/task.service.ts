import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { randomUUID } from 'crypto';
import * as fs from 'fs/promises';
import { DATABASE_PATH } from '../constants/globals.constants';
import { dateSort } from '../utils/taskLogic';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private eventEmitter: EventEmitter2) {}

  async create(newTask: CreateTaskDto) {
    const tasks = await this.findAll();
    const newId = randomUUID();
    const taskUpdated = { id: newId, ...newTask };
    tasks.push(taskUpdated);
    await fs.writeFile(DATABASE_PATH, JSON.stringify(tasks));

    this.eventEmitter.emit('order.created', console.log(`NUEVA TAREA: ${taskUpdated.id}`));
  }

  async findAll(sort?: string): Promise<Task[]> {
    const data = await fs.readFile(DATABASE_PATH);
    const tasks: Task[] = JSON.parse(data.toString());

    if (sort == 'priority') return tasks.sort((task1, task2) => task1.priority - task2.priority);

    if (sort == 'scheduledTime') return tasks.sort((task1, task2) => dateSort(task1, task2));
    return tasks;
  }

  async findOne(id: string): Promise<CreateTaskDto> {
    const tasks = await this.findAll();
    const task = tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const file = await this.findAll();

    const index = file.findIndex((task) => task.id == id);
    if (index == -1) throw new BadRequestException("The task doesn't exist");
    file[index] = { ...file[index], ...updateTaskDto };

    await fs.writeFile(DATABASE_PATH, JSON.stringify(file));
  }

  async remove(id: string) {
    const file = await this.findAll();

    const index = file.findIndex((task) => task.id == id);
    if (index == -1) throw new BadRequestException("The task doesn't exist");

    file.splice(index, 1);

    await fs.writeFile(DATABASE_PATH, JSON.stringify(file));
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const currentDate = new Date();
    const miliSecondsDate = currentDate.getTime();

    const tasks = await this.findAll();

    tasks.map((task) => {
      const date = new Date(task.scheduledTime ?? 0);
      const prevMiliSeconds = date.getTime();
      const milliSecondsLeft = prevMiliSeconds - miliSecondsDate;
      if (prevMiliSeconds < miliSecondsDate) return console.log('Ya paso');
      if (milliSecondsLeft < 43200000) {
        const hoursDiff = date.getHours() - currentDate.getHours();
        console.log(`La tarea ${task.id} vence en ${hoursDiff} horas`);
      }
    });
  }
}
