import { TestBed } from '@angular/core/testing';

import { ValoresService } from './valores.service';

describe('ValoresService', () => {
  let service: ValoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
