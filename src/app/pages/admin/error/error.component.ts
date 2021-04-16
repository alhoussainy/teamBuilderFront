import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import {CompanyService} from "../../../core/services/company/company.service";
import {LoginService} from "../../../core/services/company/login.service";
import {Response} from "../../../core/services/response";

@Component({
  selector: 'app-login',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

/**
 * Login component
 */
export class ErrorComponent implements OnInit {


  error = 'please check your login credentials';


  constructor() { }

  ngOnInit() {}

}
