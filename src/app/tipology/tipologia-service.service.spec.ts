/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipologiaServiceService } from './tipologia-service.service';

describe('Service: TipologiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipologiaServiceService]
    });
  });

  it('should ...', inject([TipologiaServiceService], (service: TipologiaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
