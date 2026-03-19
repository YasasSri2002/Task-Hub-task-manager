import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskRequestDto } from '../../Dto/request/taskRequestDto';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { TaskServices } from '../../services/tasks/task-services';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { TaskForm } from '../task-form/task-form';
import { TaskDto } from '../../Dto/taskDto';

@Component({
  selector: 'app-detailed-task-page',
  imports: [CommonModule,TitleCasePipe, DatePipe, SlicePipe,UpperCasePipe, TaskForm],
  templateUrl: './detailed-task-page.html',
  styleUrl: './detailed-task-page.css',
})
export class DetailedTaskPage implements OnInit{

  constructor(private activeRoutes: ActivatedRoute, private taskService: TaskServices ){}

  showForm: boolean =false;
  
  task$!: Observable<TaskResponseDto | null>;

  selectedTask!: TaskResponseDto | undefined;
  
  ngOnInit(): void {
   this.task$ = this.activeRoutes.paramMap.pipe(
      switchMap(params =>
        this.taskService.getTaskById(Number(params.get('taskId')))
      ),
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed",
            text: error.message,
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

        return of(null); 
      })
  );

  this.task$.subscribe(task => {
      this.selectedTask = task ?? undefined;
    });
}
   onUpdateSubmit(task:TaskRequestDto){
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
      }
   }

   closeForm(){
    this.showForm = false;
   }
 

}
