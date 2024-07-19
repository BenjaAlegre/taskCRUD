export class CreateTaskDto {
  id: string;
  name: string;
  description: string;
  scheduledTime?: Date;
  priority: number;
}
