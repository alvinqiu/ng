import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddModalComponent } from './supplier-add-modal.component';

describe('SupplierAddModalComponent', () => {
  let component: SupplierAddModalComponent;
  let fixture: ComponentFixture<SupplierAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
