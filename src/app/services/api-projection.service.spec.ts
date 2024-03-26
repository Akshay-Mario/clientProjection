import { TestBed } from '@angular/core/testing';

import { ApiProjectionService } from './api-projection.service';

describe('ApiProjectionService', () => {
  let service: ApiProjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
