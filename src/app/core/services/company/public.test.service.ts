import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonService} from '../common.service';
import {Response} from '../response';

@Injectable({providedIn: 'root'})
export class PublicTestService {
  public apiUrl: string = null;

  public path: string = 'api/v1';

  constructor(private http: HttpClient, public CommonService: CommonService) {
    this.apiUrl = CommonService.apiUrl;

  }

  PublicTest(): Observable<Response<any>> {
    return this.http.get<Response<any>>(`${this.apiUrl}${this.path}/test`);
  }

  testDetail(testType: number): any{
    return this.http.post(`${this.apiUrl}${this.path}/details`,{testType});
  }
  detailPersonality(type: number,personality:string): any{
    return this.http.post(`${this.apiUrl}${this.path}/question`,{type,personality});
  }

  detailQualiteDefaut(type: number): any{
    return this.http.post(`${this.apiUrl}${this.path}/personality`,{type});
  }


}


