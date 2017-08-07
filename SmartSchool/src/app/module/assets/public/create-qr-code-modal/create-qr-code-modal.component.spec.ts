import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQrCodeModalComponent } from './create-qr-code-modal.component';

describe('CreateQrCodeModalComponent', () => {
  let component: CreateQrCodeModalComponent;
  let fixture: ComponentFixture<CreateQrCodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQrCodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQrCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
