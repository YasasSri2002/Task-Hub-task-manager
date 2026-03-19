import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { TaskStatus } from '../../types/taskTypes';


@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard{

  @Input() task!: TaskResponseDto;
  @Output() edit = new EventEmitter<TaskResponseDto>();
  @Output() delete = new EventEmitter<number>();
  @Output() markComplete = new EventEmitter<number>();
  @Output() markInProgress = new EventEmitter<number>();

  statusColors: Record<TaskStatus, string> = {
    TODO: 'bg-gray-100 text-gray-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
  };

  statusLabels: Record<TaskStatus, string> = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  };

  get statusColor() { 
    return this.statusColors[this.task.status as TaskStatus];
  }

  get statusLabel() { 
    return this.statusLabels[this.task.status as TaskStatus]; 
  }

  get isNotCompleted() {
    return this.task.status !== 'COMPLETED'; 
  }
  get isNotStarted() { 
    return !['IN_PROGRESS', 'COMPLETED'].includes(this.task.status);
  }


}
