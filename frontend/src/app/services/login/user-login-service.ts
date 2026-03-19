import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../../Dto/response/loginResponseDto';
import { LoginRequestDto } from '../../Dto/request/loginRequestDto';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {

    constructor(private httpClient: HttpClient){}

    private baseUrl = 'http://localhost:8080';

    login(loginRequestDto: LoginRequestDto):Observable<LoginResponseDto>{
      return this.httpClient.post<LoginResponseDto>(`${this.baseUrl}/api/v1/user/login`,loginRequestDto);
    }

}
