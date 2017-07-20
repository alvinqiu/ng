import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesmodalComponent } from './classesmodal.component';

describe('ClassesmodalComponent', () => {
  let component: ClassesmodalComponent;
  let fixture: ComponentFixture<ClassesmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
