import { Task } from '../task/entities/task.entity';

export const dateSort = (task1: Task, task2: Task): number => {
  const date1 = new Date(task1.scheduledTime ?? 0).getTime();
  const date2 = new Date(task2.scheduledTime ?? 0).getTime();

  if (date1 > date2) {
    return 1; // Orden descendente
  } else if (date1 < date2) {
    return -1; // Orden descendente
  }
  return 0;
};
