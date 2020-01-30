import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './service/auth.service';
import {HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './component/profile/profile.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notAuth.guard";

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter
      }
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    NgFlashMessagesModule.forRoot()

  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
