/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Patch, Query } from '@nestjs/common/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(@Query() getTaskfilters: GetTaskFilterDto): Task[] {
        //If we have any filters defined, call taskService.getTasksWithFilters
        //Otherwise - just get all tasks.
        console.log(Object.keys(getTaskfilters));
        if (Object.keys(getTaskfilters).length) {
            return this.taskService.getTasksWithFilters(getTaskfilters);
        }
        else {
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task {
        return this.taskService.getTaskByID(id);
    }

    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    removeTaskByID(@Param('id') id: string): void {
        return this.taskService.removeTaskByID(id);
    }

    @Patch('/:id/taskStatus')
    updateTaskByID(@Param('id') id: string
    ,@Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
        const  {taskStatus} = updateTaskStatusDto;
        return this.taskService.updateTaskByID(id,taskStatus);
    }
}
