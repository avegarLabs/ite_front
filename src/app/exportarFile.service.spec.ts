/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExportarFileService } from './exportarFile.service';

describe('Service: ExportarFile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportarFileService]
    });
  });

  it('should ...', inject([ExportarFileService], (service: ExportarFileService) => {
    expect(service).toBeTruthy();
  }));
});
