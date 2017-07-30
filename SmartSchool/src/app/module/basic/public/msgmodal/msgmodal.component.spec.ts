import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgmodalComponent } from './msgmodal.component';

describe('MsgmodalComponent', () => {
  let component: MsgmodalComponent;
  let fixture: ComponentFixture<MsgmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
