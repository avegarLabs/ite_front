import { TestBed } from '@angular/core/testing';

import { ObraValuesService } from './obra-values.service';

describe('ObraValuesService', () => {
  let service: ObraValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObraValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
