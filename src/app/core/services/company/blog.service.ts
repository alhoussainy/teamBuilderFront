import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "../response";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "../common.service";
import {BlogModels} from "../../models/blog.models";


@Injectable({providedIn: 'root'})
export class BlogService {
  pathUrl: string = null;
  path: string = 'api/v1/article/';
  path2: string = 'api/v1/article/category';

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.pathUrl = this.commonService.apiUrl
  }

  blogList(): Observable<Response<BlogModels[]>> {
    return this.http.get<Response<BlogModels[]>>(`${this.pathUrl}${this.path}list`)
  }
  select(category:any): Observable<Response<BlogModels[]>> {
    return this.http.get<Response<BlogModels[]>>(`${this.pathUrl}${this.path}`+'category?category='+ category)
  }
  addBlog(blog: any): Observable<Response<BlogModels[]>> {
    return this.http.post<Response<BlogModels[]>>(`${this.pathUrl}${this.path}create`, blog)
  }

  oneBlog(id: any): Observable<Response<BlogModels>> {
    return this.http.get<Response<BlogModels>>(`${this.pathUrl}${this.path}${id}`)
  }

  delete(id: any): Observable<Response<BlogModels[]>> {
    return this.http.delete<Response<BlogModels[]>>(`${this.pathUrl}${this.path}${id}/delete`)
  }

  update(id: any, blog: any): Observable<Response<BlogModels[]>> {
    return this.http.put<Response<BlogModels[]>>(`${this.pathUrl}${this.path}${id}/update`, blog)
  }
}
