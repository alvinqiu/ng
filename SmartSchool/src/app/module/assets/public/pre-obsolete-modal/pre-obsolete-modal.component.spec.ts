import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreObsoleteModalComponent } from './pre-obsolete-modal.component';

describe('PreObsoleteModalComponent', () => {
  let component: PreObsoleteModalComponent;
  let fixture: ComponentFixture<PreObsoleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreObsoleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreObsoleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
