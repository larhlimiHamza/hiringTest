import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "../components/auth/auth.component";
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import {RegisterComponent} from "../components/register/register.component";
import {HomeComponent} from "../components/home/home.component";
import {AuthGuard} from "../guards/auth.guard";
import {ForgotPasswordComponent} from "../components/forgot-password/forgot-password.component";

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
  },
  {
    path:'sign_up',
    component:RegisterComponent,
  },
  {
    path:'forgot_password',
    component:ForgotPasswordComponent
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule { }
