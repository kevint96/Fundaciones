import { TestBed } from '@angular/core/testing';

import { ZapatasService } from './zapatas.service';

describe('ZapatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZapatasService = TestBed.get(ZapatasService);
    expect(service).toBeTruthy();
  });
});
