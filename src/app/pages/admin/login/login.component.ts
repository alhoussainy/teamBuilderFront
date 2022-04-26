import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import {LoginService} from "../../../core/services/company/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = ''
  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private service: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit():any {

    this.submitted = true;
      this.service.login(this.loginForm.value)
        .pipe(first())
        .subscribe((res)=>{
          if(res.token){
            this.router.navigate(['companies'])
          }else {
            this.router.navigate(['error'])
          }
        })
}

}
