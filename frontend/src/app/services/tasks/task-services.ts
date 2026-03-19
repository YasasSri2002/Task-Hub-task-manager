import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskResponseDto } from '../../Dto/response/taskResponseDto';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {

  constructor(private httpClient: HttpClient){}

  private baseUrl = "http://localhost:8080";


  getAllTasks(): Observable<TaskResponseDto[]>{
    return this.httpClient.get<TaskResponseDto[]>(`${this.baseUrl}/api/v1/task/all`)
  }

  deleteTaskById(taskId:number):Observable<Map<string,string>>{
    return this.httpClient.delete<Map<string,string>>(`${this.baseUrl}/api/v1/task/by-id?taskId=${taskId}`)
  }

  



}
