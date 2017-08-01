import { TestBed, inject } from '@angular/core/testing';

import { GradedateadapterService } from './gradedateadapter.service';

describe('GradedateadapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GradedateadapterService]
    });
  });

  it('should ...', inject([GradedateadapterService], (service: GradedateadapterService) => {
    expect(service).toBeTruthy();
  }));
});
