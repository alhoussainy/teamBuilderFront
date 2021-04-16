import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBlogComponent} from './one.blog.component';

describe('PersonalityTestComponent', () => {
  let component: OneBlogComponent;
  let fixture: ComponentFixture<OneBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
