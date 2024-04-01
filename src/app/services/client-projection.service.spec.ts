import { TestBed } from '@angular/core/testing';

import { ClientProjectionService } from './client-projection.service';

describe('ClientProjectionService', () => {
  let service: ClientProjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
