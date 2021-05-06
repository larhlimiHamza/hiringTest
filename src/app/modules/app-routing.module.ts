import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "../components/auth/auth.component";
import {RegisterComponent} from "../components/register/register.component";
import {HomeComponent} from "../components/home/home.component";
import {AuthGuard} from "../guards/auth.guard";
import {ForgotPasswordComponent} from "../components/forgot-password/forgot-password.component";
import {RedirectionGuard} from "../guards/redirection.guard";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'auth',
    component:AuthComponent,
    canActivate: [RedirectionGuard],
  },
  {
    path:'sign_up',
    component:RegisterComponent,
    canActivate: [RedirectionGuard],

  },
  {
    path:'forgot_password',
    component:ForgotPasswordComponent,
    canActivate: [RedirectionGuard],
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule { }
