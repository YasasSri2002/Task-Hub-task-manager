import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule,CommonModule,FontAwesomeModule ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {

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
    console.log(this.registerForm.value);
  }

  togglePassword() {
    this.isPasswordShowing = !this.isPasswordShowing;
  }

}
