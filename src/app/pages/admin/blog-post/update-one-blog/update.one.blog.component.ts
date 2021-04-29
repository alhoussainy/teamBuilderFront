import {Component, ElementRef} from '@angular/core';
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
              private  router: Router, private fb: FormBuilder ,
              private route: ActivatedRoute,private elementref: ElementRef) {}

  ngOnInit() {
   let id = this.route.snapshot.params.id
    this.blogService.oneBlog(id).subscribe(res=>{
      this.blog = res.data
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
      (data: any) => {
        console.log(data); },
      (error: any) => {console.error(error); }
    );
  }
}
