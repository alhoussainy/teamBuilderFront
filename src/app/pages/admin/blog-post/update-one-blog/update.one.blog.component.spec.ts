import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOneBlogComponent} from './update.one.blog.component';

describe('PersonalityTestComponent', () => {
  let component: UpdateOneBlogComponent;
  let fixture: ComponentFixture<UpdateOneBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOneBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOneBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
