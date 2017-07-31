import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesmodalComponent } from './officesmodal.component';

describe('OfficesmodalComponent', () => {
  let component: OfficesmodalComponent;
  let fixture: ComponentFixture<OfficesmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficesmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
