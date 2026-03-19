import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestDto } from '../../Dto/request/userRequestDto';
import { UserDto } from '../../Dto/userDto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
   constructor( private httpClient: HttpClient){}

   private apiUrl = environment.apiUrl;

   registerUser(userRequestDto: UserRequestDto): Observable<UserDto>{
      return this.httpClient.post<UserDto>(`${this.apiUrl}/api/v1/user/register`,userRequestDto);
   }

}
