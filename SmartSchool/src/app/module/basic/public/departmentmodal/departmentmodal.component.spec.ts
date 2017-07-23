import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmodalComponent } from './departmentmodal.component';

describe('DepartmentmodalComponent', () => {
  let component: DepartmentmodalComponent;
  let fixture: ComponentFixture<DepartmentmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
