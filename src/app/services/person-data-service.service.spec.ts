import { TestBed } from '@angular/core/testing';

import { PersonDataServiceService } from './person-data-service.service';

describe('PersonDataServiceService', () => {
  let service: PersonDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
