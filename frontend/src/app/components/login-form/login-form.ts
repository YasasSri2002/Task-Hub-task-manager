import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login-form',
  imports: [RouterLink,ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

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

}
