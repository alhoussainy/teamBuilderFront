import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonService} from '../common.service';
import {Response} from '../response';
import {environment} from "../../../../environments/environment";
import {LoginService} from "./login.service";
import {Company} from "../../models/company.models";

interface Companies {
  companyId: string;
  name: string;
  userAmount: number;
  SocialMediaActivity: number;
  monthlyMRR: number;
  createdSince: number;
  contractedCustomer: any;
  nbPolls: number;
  pollAnswersRate: number;
}

@Injectable({providedIn: 'root'})
export class CompanyService {
  public apiUrl: string = null;
  public path: string = 'api/v1/company/';
  public path2: string = 'api/v1/';

  constructor(private http: HttpClient, public CommonService: CommonService) {
    this.apiUrl = CommonService.apiUrl;
  }

  // Get the registered users list
  listCompanies(): Observable<Response<any>> {
    return this.http.get<Response<any>>(`${this.apiUrl}${this.path}list`);
  }

  details(id: string): Observable<Response<any>> {
    return this.http.get<Response<any>>(`${this.apiUrl}${this.path}${id}/details`);
  }

  update(id: any, active: any): Observable<Response<any>> {
    return this.http.put<Response<any>>(`${this.apiUrl}${this.path2}${id}/subscription`, {active});
  }
}
