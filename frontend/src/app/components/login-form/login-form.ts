import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserLoginService } from '../../services/login/user-login-service';

import { LoginResponseDto } from '../../Dto/response/loginResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRequestDto } from '../../Dto/request/loginRequestDto';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login-form',
  imports: [RouterLink,ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

  constructor(private loginService: UserLoginService, private cookieService: CookieService, private router: Router){}

  isPasswordShowing: boolean = false;
  eyeIcon = faEye;
  closedEyeIcon = faEyeSlash;

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  togglePassword() {
    this.isPasswordShowing = !this.isPasswordShowing;
  }

   submitForm(){

    const formData = this.loginForm.value;

    if (this.loginForm.invalid) {
      Swal.fire({
        title: "Try Again!",
        text: "Please enter your credentials!",
        icon: "warning"
      });
    }

    if(this.loginForm.valid){

      const loginRequestDto: LoginRequestDto={
        email: formData.email!,
        password: formData.password!
      }

      this.loginService.login(loginRequestDto).subscribe({
        next:(data:LoginResponseDto)=>{

          this.cookieService.set('auth-token', data.jwtToken, {
            expires: 7,        // expires in 7 days
            path: '/',
            secure: true,       
            sameSite: 'Strict'
          });

          console.log('Cookie after set:', this.cookieService.get('auth-token'));

          this.cookieService.set('x-user-id', data.userId, {
            expires: 7,        // expires in 7 days
            path: '/',
            secure: true,      
            sameSite: 'Strict'
          });

           Swal.fire({
              position: "center",
              icon: "success",
              title: "Login Success",
              showConfirmButton: false,
              timer: 1500
          }).then(()=> this.router.navigate(['/task-page']));
          
        },
        error: (error: HttpErrorResponse)=>{
            
          if (error.status === 401) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Login Failed",
              text: "Invalid username or password!",
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



}
