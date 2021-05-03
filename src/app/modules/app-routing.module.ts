import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "../components/auth/auth.component";

const routes: Routes = [
  {
    path:'',
    component:AuthComponent,
  },
  {
    path:'auth',
    component:AuthComponent
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports :[RouterModule]

})
export class AppRoutingModule { }
