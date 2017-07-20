import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesmodalComponent } from './gradesmodal.component';

describe('GradesmodalComponent', () => {
  let component: GradesmodalComponent;
  let fixture: ComponentFixture<GradesmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
