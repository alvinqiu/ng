import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTypeModalComponent } from './assets-type-modal.component';

describe('AssetsTypeModalComponent', () => {
  let component: AssetsTypeModalComponent;
  let fixture: ComponentFixture<AssetsTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
