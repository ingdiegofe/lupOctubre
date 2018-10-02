import { TestBed, inject } from '@angular/core/testing';

import { AdminEmpresasService } from './admin-empresas.service';

describe('AdminEmpresasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEmpresasService]
    });
  });

  it('should be created', inject([AdminEmpresasService], (service: AdminEmpresasService) => {
    expect(service).toBeTruthy();
  }));
});
