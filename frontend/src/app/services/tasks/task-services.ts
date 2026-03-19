import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';
import { TaskDto } from '../../Dto/taskDto';
import { TaskRequestDto } from '../../Dto/request/taskRequestDto';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {

  constructor(private httpClient: HttpClient){}

  private baseUrl = "http://localhost:8080";


  getAllTasks(): Observable<TaskResponseDto[]>{
    return this.httpClient.get<TaskResponseDto[]>(`${this.baseUrl}/api/v1/task/all`)
  }

  deleteTaskById(taskId:number):Observable<{[key: string]: string}>{
    return this.httpClient.delete<{[key: string]: string}>(`${this.baseUrl}/api/v1/task/by-id?taskId=${taskId}`)
  }

  createTask(taskRequestDto: TaskRequestDto):Observable<TaskDto>{
    return this.httpClient.post<TaskDto>(`${this.baseUrl}/api/v1/task/persist`,taskRequestDto);
  }

  updateTaskById(taskId:number,taskRequestDto: TaskRequestDto):Observable<TaskDto>{
    return this.httpClient.put<TaskDto>(`${this.baseUrl}/api/v1/task/by-id?taskId=${taskId}`,taskRequestDto);
  }

  markAsCompleted(taskId:number):Observable<{[key: string]: string}>{
    return this.httpClient.patch<{[key: string]: string}>(
      `${this.baseUrl}/api/v1/task/by-id/mark-as-completed?taskId=${taskId}`,{})
  }

  markAsInProgress(taskId:number):Observable<{[key: string]: string}>{
    return this.httpClient.patch<{[key: string]: string}>(
      `${this.baseUrl}/api/v1/task/by-id/mark-as-in-progress?taskId=${taskId}`,{}
    )
  }

  getTaskById(taskId:number):Observable<TaskResponseDto>{
    return this.httpClient.get<TaskResponseDto>(`${this.baseUrl}/api/v1/task/by-id?taskId=${taskId}`)
  }

  



}
