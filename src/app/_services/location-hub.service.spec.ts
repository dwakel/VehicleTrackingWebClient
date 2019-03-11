import { TestBed } from '@angular/core/testing';

import { LocationHubService } from './location-hub.service';

describe('LocationHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationHubService = TestBed.get(LocationHubService);
    expect(service).toBeTruthy();
  });
});
