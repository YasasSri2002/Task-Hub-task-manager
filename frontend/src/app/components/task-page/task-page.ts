import { Component, OnInit } from '@angular/core';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { CommonModule } from '@angular/common';
import { TaskCard } from '../task-card/task-card';
import { TaskStatus } from '../../types/taskTypes';
import { FormsModule } from '@angular/forms';
import { TaskForm } from '../task-form/task-form';
import { TaskRequestDto } from '../../Dto/request/taskRequestDto';
import { TaskServices } from '../../services/tasks/task-services';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../Dto/response/errorResponseDto';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule,TaskCard,FormsModule,TaskForm],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage implements OnInit {

  constructor(private taskService: TaskServices){}

  taskList!: TaskResponseDto[];
  taskToEdit?: TaskResponseDto;  
  showTaskForm = false;
  statusFilter: TaskStatus | '' = ''; 
  showForm = false;
  selectedTask: TaskResponseDto| undefined = undefined;

  
  ngOnInit(){
     this.taskService.getAllTasks().subscribe({
      next:(data: TaskResponseDto[])=>{
        this.taskList= data;
      },error:(error: HttpErrorResponse)=>{

        const errorBody: ErrorResponseDto = error.error; 
    

        Swal.fire({
          icon: "error",
          title: `Error ${errorBody.httpStatus}`,
          text: `${errorBody.message}`,
          
        })
      }
     })
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
