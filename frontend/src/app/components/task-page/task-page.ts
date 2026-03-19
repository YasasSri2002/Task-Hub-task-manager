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
import { TaskDto } from '../../Dto/taskDto';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule,TaskCard,FormsModule,TaskForm],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage implements OnInit {

  constructor(private taskService: TaskServices){}

  taskList: TaskResponseDto[] =[];
  taskToEdit?: TaskResponseDto;  
  statusFilter: TaskStatus | '' = ''; 
  showForm:boolean = false;
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

 async handleDeleteTask(taskId: number) {
    const confirm = await Swal.fire({
      title: `Delete task #${taskId}?`,
      icon: 'question',
      showCancelButton: true
    });

    if(!confirm.isConfirmed) return;

    this.taskService.deleteTaskById(taskId).subscribe({
      next:(response:{[key: string]: string})=>{
        Swal.fire({
          title: "Deleted Successfully",
          text: `${response["Success"]}`,
          timer: 3000
        }).then(()=> 
          this.taskList = this.taskList.filter(task => task.id !== taskId)
        );
      },error: (error: HttpErrorResponse)=>{

        if (error.status === 401) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Delete Failed",
            text: `${error.message}`,
             timer: 3000
           });
        } else {
           Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong",
              text: "Please try again later.",
              timer: 3000
            });
          }
      }
    })
    
  }

 async handleMarkComplete(taskId: number) {
    const confirm = await Swal.fire({
      title: `mark as completed?`,
      icon: 'question',
      showCancelButton: true
    });

    if(!confirm.isConfirmed) return;

    this.taskService.markAsCompleted(taskId).subscribe({
      next:(response:{[key: string]: string})=>{
        Swal.fire({
          title: "Completed",
          text: `${response["Success"]}`,
          timer: 3000
        }).then(()=> 

          window.location.reload()
        );
      },error: (error: HttpErrorResponse)=>{

        if (error.status === 401) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed",
            text: `${error.message}`,
             timer: 3000
           });
        } else {
           Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong",
              text: "Please try again later.",
              timer: 3000
            });
          }
      }
    })
  }

async  handleMarkInProgress(taskId: number) {
    const confirm = await Swal.fire({
      title: `mark as in progress?`,
      icon: 'question',
      showCancelButton: true
    });

    if(!confirm.isConfirmed) return;

    this.taskService.markAsInProgress(taskId).subscribe({
      next:(response:{[key: string]: string})=>{
        Swal.fire({
          title: "In progress!",
          text: `${response["Success"]}`,
          timer: 3000
        }).then(()=> 

          window.location.reload()
        );
      },error: (error: HttpErrorResponse)=>{

        if (error.status === 401) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed",
            text: `${error.message}`,
             timer: 3000
           });
        } else {
           Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong",
              text: "Please try again later.",
              timer: 3000
            });
          }
      }
    })
  }

   onTaskUpdateSubmit(task: TaskRequestDto){
    if(task.id){
        this.taskService.updateTaskById(task.id,task).subscribe({
          next:(task:TaskDto)=>{
            Swal.fire({
              icon: "success",
              title: "Updated Successfully",
              text: `${task.title} is updated`
            }).then(()=> window.location.reload())

          },error(error: HttpErrorResponse){
              if (error.status === 401) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Update Failed",
                  text: `${error.message}`,
                  timer: 3000
                });
              } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong",
                    text: "Please try again later.",
                    timer: 3000
                  });
          }
          }
        })
    }else{
        this.taskService.createTask(task).subscribe({
           next:(task:TaskDto)=>{
            Swal.fire({
              icon: "success",
              title: "Created Successfully",
              text: `${task.title} task created`
            }).then(()=> window.location.reload())
          },error(error: HttpErrorResponse){

            const errorBody: ErrorResponseDto = error.error;

            Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Save Failed",
                  text: `${errorBody.message}`,
                  timer: 3000
                });
            

              if (error.status === 401) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Save Failed",
                  text: `${error.message}`,
                  timer: 3000
                });
              } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong",
                    text: "Please try again later.",
                    timer: 3000
                  });
          }
          }
        })
    }
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
