import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonService} from '../common.service';
import {Response} from '../response';

@Injectable({providedIn: 'root'})
export class StatService {
  public apiUrl: string = null;

  public path: string = 'api/v1/stats';

  constructor(private http: HttpClient, public CommonService: CommonService) {
    this.apiUrl = CommonService.apiUrl;

  }

  stats(): Observable<Response<any>> {
    return this.http.get<Response<any>>(`${this.apiUrl}${this.path}`);
  }

}


