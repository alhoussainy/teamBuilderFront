import { Component } from '@angular/core';


import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../../../core/services/company/blog.service";
import { BlogModels } from "../../../core/models/blog.models";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-blog-post',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  imagepath = environment.awsUrl
  blogs: BlogModels[] = []
  blog1: BlogModels[] = []
  category = {
    qvt: 1,
    stress: 2
  }
  loaded: boolean = false;

  constructor(private blogService: BlogService, private router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.blogService.blogList().subscribe(res => {
      this.blogs = res.data
    }, (error => {
      if (error.status == 401) {
        this.router.navigate(['error'])
      }
    }))
  }


  onDelete(id: string) {
    this.blogService.delete(id).subscribe((res) => {
      let result = confirm("etes vous sûr?")
      if (result) {
        this.loadData();
        this.router.navigate(['blog'])
      }
    }, (error => {
      if (error.status == 401) {
        this.router.navigate(['error'])
      }
    }))
  }

  onEdit(blog: BlogModels) {
    this.router.navigate(['edit/' + blog.id])
  }

  filterGlobal(category: any) {
    this.blogService.select(category).subscribe((res) => {
      if (res.success) {
        this.blogs = res.data;
      }
    })
  }

  onSelect(b: any) {
    this.blogService.publish(b).subscribe((res) => {
      b.published = res.data.published
      this.loadData();
    })
  }
}
