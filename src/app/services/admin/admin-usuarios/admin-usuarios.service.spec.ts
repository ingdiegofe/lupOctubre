import { TestBed, inject } from '@angular/core/testing';

import { AdminUsuariosService } from './admin-usuarios.service';

describe('AdminUsuariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminUsuariosService]
    });
  });

  it('should be created', inject([AdminUsuariosService], (service: AdminUsuariosService) => {
    expect(service).toBeTruthy();
  }));
});
