import { IsEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTaskFilterDto {
  @IsEmpty()
  status?: TaskStatus;

  @IsEmpty()
  search?: string;
}
