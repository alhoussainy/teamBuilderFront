import { Component, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { BlogService } from "../../../../core/services/company/blog.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyUploadAdapter } from "./upload.adapter";
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
//import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
// @ts-ignore
//import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';



function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    console.log(loader)
    return new MyUploadAdapter(loader);
  };
}



@Component({
  selector: 'app-admin-blog-post',
  templateUrl: './add.blog.component.html',
  styleUrls: ['./add.blog.component.scss'],
})
export class AddBlogComponent {
  formGroup: FormGroup;
  public Editor = ClassicEditor;
  constructor(private blogService: BlogService,
    private router: Router,
    private fb: FormBuilder,
    private elementref: ElementRef) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      slug: ['', Validators.required],
      published: ['', Validators.required],
      image_url: [''],
    })

    ClassicEditor
      .create(document.querySelector('#editor'), {
        extraPlugins: [MyCustomUploadAdapterPlugin]

      })
      .catch(error => {
        console.log(error);
      });

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
    const inputEl: HTMLInputElement = this.elementref.nativeElement.querySelector('#image');
    const formData = new FormData();
    formData.append('image', inputEl.files.item(0));

    this.blogService.upload(formData).subscribe(
      (data: any) => {
        if (data) {
          alert("success")
        }
      },
      (error: any) => { console.error(error); }
    );
  }

}
