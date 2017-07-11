import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsmodalComponent } from './schoolsmodal.component';

describe('SchoolsmodalComponent', () => {
  let component: SchoolsmodalComponent;
  let fixture: ComponentFixture<SchoolsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
