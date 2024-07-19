import { IsNumber, IsString, MaxLength } from 'class-validator';

export class Task {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  @MaxLength(30)
  description: string;
  @IsString()
  scheduledTime?: string;
  @IsNumber()
  priority?: number;
}
