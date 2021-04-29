import {Component, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {BlogService} from "../../../../core/services/company/blog.service";
import {BlogModels} from "../../../../core/models/blog.models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-admin-blog-post',
  templateUrl: './add.blog.component.html',
  styleUrls: ['./add.blog.component.scss'],
})
export class AddBlogComponent {
  formGroup: FormGroup;
  public Editor = ClassicEditor;
  constructor(private blogService: BlogService,
              private  router: Router, private fb: FormBuilder, private elementref: ElementRef) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      slug: ['', Validators.required],
      published: ['',Validators.required],
      image_url:[''],
    })
  }

  onSubmit() {
    this.blogService.addBlog(this.formGroup.value).subscribe(res => {
      this.router.navigate(['blog'])
    }, (error => {
      if (error.status == 401) {
        this.router.navigate(['error'])
      }
    }))
  }

  upload() {
    const  inputEl: HTMLInputElement = this.elementref.nativeElement.querySelector('#image');
    const formData = new FormData();
    formData.append('image', inputEl.files.item(0));

    this.blogService.upload(formData).subscribe(
      (data: any) => {},
      (error: any) => {console.error(error); }
    );
  }
}
