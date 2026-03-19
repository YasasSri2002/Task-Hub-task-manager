import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserRegisterService } from '../../services/user-register-service';
import { UserRequestDto } from '../../Dto/request/userRequestDto';
import { UserDto } from '../../Dto/userDto';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule,CommonModule,FontAwesomeModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {

  constructor(private userRegisterService: UserRegisterService , private router: Router){}

  isPasswordShowing: boolean = false;
  eyeIcon = faEye;
  closedEyeIcon = faEyeSlash;

  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    username: new FormControl('',[Validators.required,Validators.min(3)]),
    password: new FormControl('',[Validators.required,Validators.min(8)])
  })

  clearForm(){
    this.registerForm.reset();
  }

  submitForm(){
    const formValue = this.registerForm.value;


     if (this.registerForm.invalid) {
      Swal.fire({
        title: "Try Again!",
        text: "Please fill the information first",
        icon: "warning"
      });
    }
    

    if (this.registerForm.valid) {
       Swal.fire({
        title: 'Registering...',
        text: 'Please wait while we process your registration',
        allowOutsideClick: false,
        background: '#fff',
        color: '#000000',
        didOpen: () => { Swal.showLoading(); }
      });
      const userRequestDto: UserRequestDto = {
        email: formValue.email!,
        password: formValue.password!,
        username: formValue.username!,
      }

      this.userRegisterService.registerUser(userRequestDto).subscribe({
        next:(data: UserDto)=>{
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: `${data.username} registed successfully!`,
            background: '#fff',
            color: '#000000',
            confirmButtonColor: '#dc2626',
            timer: 2500,
            timerProgressBar: true,
            customClass: { popup: 'border border-gray-700' }
          }).then(()=> this.router.navigate(['/login']));
          this.clearForm();
        },
        error: (error: HttpErrorResponse)=>{
          const errorBody = error.error;
          Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text:  errorBody.message,
              background: '#fff',
              color: '#000000',
              confirmButtonColor: '#dc2626',
              customClass: { popup: 'border border-gray-700' }
            });
        }
      })

    }


  }

  togglePassword() {
    this.isPasswordShowing = !this.isPasswordShowing;
  }

}
