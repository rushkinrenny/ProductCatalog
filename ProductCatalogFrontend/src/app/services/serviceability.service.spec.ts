import { TestBed } from '@angular/core/testing';

import { ServiceabilityService } from './serviceability.service';

describe('ServiceabilityService', () => {
  let service: ServiceabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
