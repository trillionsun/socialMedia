import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from '@angular/router';
import {NgFlashMessageService} from "ng-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService

  ) { }
  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/']);
    this.ngFlashMessageService.showFlashMessage({  messages: ["You have successfully logged out!"],type: 'info' });
  }

  ngOnInit() {
  }

}
