import {Component} from '@angular/core';


import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../../core/services/company/blog.service";
import {BlogModels} from "../../../core/models/blog.models";

@Component({
  selector: 'app-admin-blog-post',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {

  blog: BlogModels[] = []
  loaded: boolean= false;

  constructor(private blogService: BlogService , private  router: Router,private  route: ActivatedRoute) {
  }

  ngOnInit() {
  this.loadData();
  }

loadData(){
    this.blogService.blogList().subscribe(res=>{
      console.log(res)
    this.blog = res.data
    }, (error => {
      if(error.status == 401){
        this.router.navigate(['error'])
      }
    }))
}


  onDelete(id: string) {
    this.blogService.delete(id).subscribe((res)=>{
      let result = confirm("etes vous sûr?")
        if (result){
          this.loadData();
          this.router.navigate(['blog'])
        }
    },(error => {
      if(error.status == 401){
        this.router.navigate(['error'])
      }
    }))
  }

  onEdit(blog: BlogModels) {
     this.router.navigate(['edit/'+blog.id])
  }

  selecte(category: number) {

    this.blogService.select(category).subscribe((res)=>{
      if (res.success){
        this.blog = res.data
      }
    })
  }
}
