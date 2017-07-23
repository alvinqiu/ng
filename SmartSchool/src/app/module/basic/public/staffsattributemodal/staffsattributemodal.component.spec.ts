import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsattributemodalComponent } from './staffsattributemodal.component';

describe('StaffsattributemodalComponent', () => {
  let component: StaffsattributemodalComponent;
  let fixture: ComponentFixture<StaffsattributemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsattributemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsattributemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
