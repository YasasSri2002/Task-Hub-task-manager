import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../../Dto/response/loginResponseDto';
import { environment } from '../../../environments/environment.dev';
import { LoginRequestDto } from '../../Dto/request/loginRequestDto';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {

    constructor(private httpClient: HttpClient){}

    private apiUrl = environment.apiUrl;

    login(loginRequestDto: LoginRequestDto):Observable<LoginResponseDto>{
      return this.httpClient.post<LoginResponseDto>(`${this.apiUrl}/api/v1/user/login`,loginRequestDto);
    }

}
