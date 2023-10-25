import { TestBed } from '@angular/core/testing';

import { FisherService } from './fisher.service';

describe('FisherService', () => {
  let service: FisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
