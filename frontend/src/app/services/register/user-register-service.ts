import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestDto } from '../../Dto/request/userRequestDto';
import { UserDto } from '../../Dto/userDto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
   constructor( private httpClient: HttpClient){}

   private baseUrl = 'http://localhost:8080';

   registerUser(userRequestDto: UserRequestDto): Observable<UserDto>{
      return this.httpClient.post<UserDto>(`${this.baseUrl}/api/v1/user/register`,userRequestDto);
   }

}
