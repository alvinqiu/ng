import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHistoryModalComponent } from './stock-history-modal.component';

describe('StockHistoryModalComponent', () => {
  let component: StockHistoryModalComponent;
  let fixture: ComponentFixture<StockHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
