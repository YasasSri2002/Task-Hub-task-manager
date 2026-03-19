import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { TaskRequestDto } from '../../Dto/request/taskRequestDto';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {

  constructor(private cookieService: CookieService){}

  @Input() task?: TaskResponseDto;
  @Output() submitForm = new EventEmitter<TaskRequestDto>();
  @Output() cancelForm = new EventEmitter<void>();

  loading = false;

   form = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.max(200)]),
    status: new FormControl('',[Validators.required]),

  })

  ngOnInit(): void {
    if(this.task){
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status
      });
    }
  }

  onOverlayClick(): void {
    this.cancelForm.emit();
   
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }


  onCancel(){
    this.cancelForm.emit();
   
  }

  onSubmitForm(){
       if (this.form.invalid) {
          Swal.fire({
            title: "Try Again!",
            text: "Please fill the information first",
            icon: "warning"
          });
        }

        const taskData: TaskRequestDto = {
          id: this.task?.id,             // 👈 include id if updating
          title: this.form.value.title!,
          description: this.form.value.description ?? '',
          status: this.form.value.status!,
          userId: this.cookieService.get("x-user-id")
        };

        this.loading = true;
        this.submitForm.emit(taskData);

  }

  



}
