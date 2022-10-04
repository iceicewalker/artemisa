import { TestBed } from '@angular/core/testing';

import { RankGuard } from './rank.guard';

describe('RankGuard', () => {
  let guard: RankGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RankGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
