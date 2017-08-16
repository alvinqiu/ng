import { TestBed, async, inject } from '@angular/core/testing';

import { ApiGuardGuard } from './api-guard.guard';

describe('ApiGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGuardGuard]
    });
  });

  it('should ...', inject([ApiGuardGuard], (guard: ApiGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
