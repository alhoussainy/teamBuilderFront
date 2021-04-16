import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../../../core/services/company/blog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-admin-blog-post',
  templateUrl: './update.one.blog.component.html',
  styleUrls: ['./update.one.blog.component.scss'],
})
export class UpdateOneBlogComponent {

  blog: any={};
  loaded: boolean = false;
  formGroup: FormGroup;
  public Editor = ClassicEditor;
  constructor(private blogService: BlogService,
              private  router: Router, private fb: FormBuilder , private route: ActivatedRoute) {
  }

  ngOnInit() {
   let id = this.route.snapshot.params.id
    this.blogService.oneBlog(id).subscribe(res=>{
      this.blog = res.data
      console.log(this.blog)
      this.iniForm();
    })
  }

iniForm(){
  this.formGroup = this.fb.group({
    title: this.blog.title,
    content: this.blog.content ,
    category: this.blog.category,
    slug: this.blog.title.split(' ').join('-').toLowerCase(),
    published: this.blog.published,
    image_url: this.blog.image_url
  })
}

  onSubmit() {
    this.blogService.update(this.blog.id,this.formGroup.value).subscribe(res => {
      console.log(res.data)
      console.log(this.formGroup.value)
      this.router.navigate(['blog'])
    }, (error => {
      if (error.status == 401) {
        this.router.navigate(['error'])
      }
    }))
  }
}
