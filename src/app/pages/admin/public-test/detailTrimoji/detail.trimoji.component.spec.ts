import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTestComponent } from './détail.trimoji.component';

describe('PersonalityTestComponent', () => {
  let component: PublicTestComponent;
  let fixture: ComponentFixture<PublicTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicTestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
