import { Component, OnInit } from '@angular/core';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { CommonModule } from '@angular/common';
import { TaskCard } from '../task-card/task-card';
import { TaskStatus } from '../../types/taskTypes';
import { FormsModule } from '@angular/forms';
import { TaskForm } from '../task-form/task-form';
import { TaskRequestDto } from '../../Dto/request/taskRequestDto';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule,TaskCard,FormsModule,TaskForm],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage implements OnInit {

  taskList!: TaskResponseDto[];
  taskToEdit?: TaskResponseDto;  
  showTaskForm = false;
  statusFilter: TaskStatus | '' = ''; 
  showForm = false;
  selectedTask: TaskResponseDto| undefined = undefined;

  ngOnInit(){
     this.taskList = [
      {
        id: 1,
        title: 'testing task card',
        description: 'testing if the task card is showing as intended',
        status: 'IN_PROGRESS',
        createdAt: new Date('2025-03-19'),
        user: { 
          email: 'john@example.com',
          username: "jhon",
          id: "123123"
        }
      },
      {
        id: 2,
        title: 'testing task card',
        description: 'testing if the task card is showing as intended',
        status: 'COMPLETED',
        createdAt: new Date('2025-03-19'),
        user: { 
          email: 'john@example.com',
          username: "jhon",
          id: "123123"
        }
      },
      {
        id: 3,
        title: 'testing task card',
        description: 'testing if the task card is showing as intended',
        status: 'TODO',
        createdAt: new Date('2025-03-19'),
        user: { 
          email: 'john@example.com',
          username: "jhon",
          id: "123123"
        }
      }
     ]
  }

  get filteredTasks(): TaskResponseDto[] {
    if (!this.statusFilter) return [...this.taskList];
    const filteredlist = this.taskList.filter(task => task.status === this.statusFilter);
    const others = this.taskList.filter(task=> task.status !== this.statusFilter);

    return [...filteredlist,...others];
  }

  handleDeleteTask(id: number) {
    this.taskList = this.taskList.filter(task => task.id !== id);
  }

  handleMarkComplete(id: number) {
    this.taskList = this.taskList.map(task => task.id === id ? { ...task, status: 'COMPLETED' } : task);
  }

  handleMarkInProgress(id: number) {
    this.taskList = this.taskList.map(task => task.id === id ? { ...task, status: 'IN_PROGRESS' } : task);
  }

  onTaskUpdateSubmit(data: TaskRequestDto){

  }
  
  openNewTaskForm() {
    this.selectedTask = undefined;
    this.showForm = true;
  }

  closeForm() {
    this.selectedTask = undefined;
    this.showForm = false;
  }

}
