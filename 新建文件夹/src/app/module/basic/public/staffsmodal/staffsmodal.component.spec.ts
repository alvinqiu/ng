import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsmodalComponent } from './staffsmodal.component';

describe('StaffsmodalComponent', () => {
  let component: StaffsmodalComponent;
  let fixture: ComponentFixture<StaffsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
