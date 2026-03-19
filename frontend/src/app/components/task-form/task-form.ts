import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { TaskRequestDto } from '../../Dto/request/taskRequestDto';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {

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

  



}
