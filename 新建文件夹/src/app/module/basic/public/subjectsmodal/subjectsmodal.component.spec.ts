import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsmodalComponent } from './subjectsmodal.component';

describe('SubjectsmodalComponent', () => {
  let component: SubjectsmodalComponent;
  let fixture: ComponentFixture<SubjectsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
