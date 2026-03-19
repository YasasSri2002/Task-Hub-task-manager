import { Component, OnInit } from '@angular/core';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { CommonModule } from '@angular/common';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule,TaskCard],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage implements OnInit {

  taskList!: TaskResponseDto[];
  taskToEdit?: TaskResponseDto;  
  showTaskForm = false; 

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
      }
     ]
  }

   handleDeleteTask(id: number) {
    this.taskList = this.taskList.filter(t => t.id !== id);
  }

  handleMarkComplete(id: number) {
    this.taskList = this.taskList.map(t => t.id === id ? { ...t, status: 'COMPLETED' } : t);
  }

  handleMarkInProgress(id: number) {
    this.taskList = this.taskList.map(t => t.id === id ? { ...t, status: 'IN_PROGRESS' } : t);
  }


}
