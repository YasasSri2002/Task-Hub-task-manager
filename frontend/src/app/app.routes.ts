
import { Routes } from '@angular/router';
import { RegisterForm } from './components/register-form/register-form';
import { LoginForm } from './components/login-form/login-form';

import { TaskPage } from './components/task-page/task-page';
import { DetailedTaskPage } from './components/detailed-task-page/detailed-task-page';





export const routes: Routes = [
    {path: '', component: LoginForm},
    {path:'register', component:RegisterForm},
    {path: 'login', component: LoginForm},

    // protected routes
    {path: 'task-page', component: TaskPage},
    {path: 'detailed-task/:taskId', component: DetailedTaskPage}
   

];
