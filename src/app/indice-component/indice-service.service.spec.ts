/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IndiceServiceService } from './indice-service.service';

describe('Service: IndiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndiceServiceService]
    });
  });

  it('should ...', inject([IndiceServiceService], (service: IndiceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
