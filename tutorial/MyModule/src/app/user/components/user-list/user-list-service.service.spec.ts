import { TestBed, inject } from '@angular/core/testing';

import { UserLIstServiceService } from './user-list-service.service';

describe('UserLIstServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLIstServiceService]
    });
  });

  it('should be created', inject([UserLIstServiceService], (service: UserLIstServiceService) => {
    expect(service).toBeTruthy();
  }));
});
