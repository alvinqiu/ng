import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffpropertyComponent } from './staffproperty.component';

describe('StaffpropertyComponent', () => {
  let component: StaffpropertyComponent;
  let fixture: ComponentFixture<StaffpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
