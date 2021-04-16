import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {LoginService} from "../services/company/login.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const ActiveUser = this.loginService.currentUserValue;
            if (ActiveUser?.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${ActiveUser?.token}`
                    }
                });
            }
        return next.handle(request);
    }
}
