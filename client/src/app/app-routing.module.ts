import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {RegisterComponent} from "./component/register/register.component";
import {LoginComponent} from "./component/login/login.component";
import {ProfileComponent} from "./component/profile/profile.component";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  },
  { path: 'Dashboard',
    component: DashboardComponent,
  },
  {path: 'Profile', component: ProfileComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Login', component:LoginComponent },

  { path: '**', component: HomeComponent },  // must be the last one

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
