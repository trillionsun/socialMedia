import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notAuth.guard";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  },
  { path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'Register', component: RegisterComponent, canActivate:[NotAuthGuard]},
  {path: 'Login', component:LoginComponent, canActivate: [NotAuthGuard]},

  { path: '**', component: HomeComponent },  // must be the last one

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
