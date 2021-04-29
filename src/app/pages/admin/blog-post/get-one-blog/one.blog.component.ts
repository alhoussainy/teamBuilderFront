import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../../../../core/services/company/blog.service";
import { BlogModels } from "../../../../core/models/blog.models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-blog-post',
  templateUrl: './one.blog.component.html',
  styleUrls: ['./one.blog.component.scss'],
})
export class OneBlogComponent {
  imagepath = environment.awsUrl
  blog: any = {};
  loaded: boolean = false;
  formGroup: FormGroup;
  public Editor = ClassicEditor;
  constructor(private blogService: BlogService,
    private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadData();
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      slug: ['', Validators.required],
      published: ['', Validators.required],
      image_url: ['', Validators.required]
    })
  }

  loadData() {
    let id = this.route.snapshot.params.id
    this.blogService.oneBlog(id).subscribe(res => {
      this.blog = res.data
    }, (error => {
      if (error.status == 401) {
        this.router.navigate(['error'])
      }
    }))
  }
}
