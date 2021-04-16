import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonService} from '../common.service';
import {Response} from '../response';

@Injectable({providedIn: 'root'})
export class LoginService {
  public apiUrl: string = null;

  public path: string = 'api/v1/login';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUserObservable: Observable<any>;

  constructor(private http: HttpClient, public CommonService: CommonService) {
    this.apiUrl = CommonService.apiUrl;
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(user: any): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}${this.path}`, user)
      .pipe(map((CurrentUser) => {
        if ( CurrentUser && CurrentUser.token) {
          localStorage.setItem('token', JSON.stringify(CurrentUser))
          this.currentUserSubject.next(CurrentUser);
        }
        return CurrentUser
      }));
  }

  logout(): any {
    // remove user from local storage to log user out
     localStorage.removeItem('token');
     this.currentUserSubject.next(null);
  }
}


