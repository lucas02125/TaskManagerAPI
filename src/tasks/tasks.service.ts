import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // eslint-disable-next-line prettier/prettier
    getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasks = this.getAllTasks();

    // do something with the status
    if (status) {
      tasks = tasks.filter((task) => task.taskStatus === status);
    }
    // do something with the search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    //return the final result
    return tasks;
  }

  getTaskByID(id: string): Task {
    // try to get task
    const foundTask = this.tasks.find((x) => x.id === id);
    // if not found, throw an error (404 not found)
    if (!foundTask) {
      // eslint-disable-next-line prettier/prettier
      throw new NotFoundException("Cannot find task: " + id);
    }
    //otherwise return the found task

    // eslint-disable-next-line prettier/prettier
    
    return foundTask;
  }

  removeTaskByID(id: string): void {

    const found = this.getTaskByID(id);
    this.tasks = this.tasks.filter((take) => take.id !== found.id);
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      taskStatus: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskByID(id: string, status: TaskStatus): Task {
    const foundTask = this.getTaskByID(id);
    foundTask.taskStatus = status;
    return foundTask;
  }
}
