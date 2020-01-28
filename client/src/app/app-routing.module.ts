import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {RegisterComponent} from "./component/register/register.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  },
  { path: 'Dashboard',
    component: DashboardComponent,
  },
  {path: 'Register', component: RegisterComponent},
  {path: 'Login', component:LoginComponent },

  { path: '**', component: HomeComponent },  // must be the last one

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
