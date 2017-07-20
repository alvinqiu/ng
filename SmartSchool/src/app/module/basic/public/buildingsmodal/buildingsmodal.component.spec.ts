import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsmodalComponent } from './buildingsmodal.component';

describe('BuildingsmodalComponent', () => {
  let component: BuildingsmodalComponent;
  let fixture: ComponentFixture<BuildingsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
