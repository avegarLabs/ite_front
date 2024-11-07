import { TestBed } from '@angular/core/testing';

import { UnidadFinService } from './unidad-fin.service';

describe('UnidadFinService', () => {
  let service: UnidadFinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadFinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
