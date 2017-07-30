import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAddModalComponent } from './assets-add-modal.component';

describe('AssetsAddModalComponent', () => {
  let component: AssetsAddModalComponent;
  let fixture: ComponentFixture<AssetsAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
