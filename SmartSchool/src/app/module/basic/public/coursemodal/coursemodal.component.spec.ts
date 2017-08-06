import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursemodalComponent } from './coursemodal.component';

describe('CoursemodalComponent', () => {
  let component: CoursemodalComponent;
  let fixture: ComponentFixture<CoursemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
