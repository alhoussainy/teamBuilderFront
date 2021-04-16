import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {LoginService} from "../../../core/services/company/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

/**
 * Login component
 */
export class LogoutComponent implements OnInit {

  constructor(private  service: LoginService , private  router: Router) { }

  ngOnInit() {
    this.service.logout();
    this.router.navigate(['signIn']);
  }

}
