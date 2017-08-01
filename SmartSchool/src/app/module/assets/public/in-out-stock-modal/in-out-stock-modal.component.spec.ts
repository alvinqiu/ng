import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutStockModalComponent } from './in-out-stock-modal.component';

describe('InOutStockModalComponent', () => {
  let component: InOutStockModalComponent;
  let fixture: ComponentFixture<InOutStockModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InOutStockModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InOutStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
