import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffunaccountComponent } from './staffunaccount.component';

describe('StaffunaccountComponent', () => {
  let component: StaffunaccountComponent;
  let fixture: ComponentFixture<StaffunaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffunaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffunaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
