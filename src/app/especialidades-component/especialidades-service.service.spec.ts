/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EspecialidadesServiceService } from './especialidades-service.service';

describe('Service: EspecialidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspecialidadesServiceService]
    });
  });

  it('should ...', inject([EspecialidadesServiceService], (service: EspecialidadesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
