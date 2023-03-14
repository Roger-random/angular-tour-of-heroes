import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('generate default ID 11 for empty list', () => {
    expect(service.genId([])).toEqual(11);
  });

  it('generate ID 21 for hero list', () => {
    expect(service.genId(service.createDb().heroes)).toEqual(21);
  });
});
