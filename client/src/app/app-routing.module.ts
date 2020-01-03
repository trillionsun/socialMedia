import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  },
  { path: 'Dashboard',
    component: DashboardComponent,
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
