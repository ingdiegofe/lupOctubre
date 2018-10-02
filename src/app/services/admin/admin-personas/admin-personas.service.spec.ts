import { TestBed, inject } from '@angular/core/testing';

import { AdminPersonasService } from './admin-personas.service';

describe('AdminPersonasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPersonasService]
    });
  });

  it('should be created', inject([AdminPersonasService], (service: AdminPersonasService) => {
    expect(service).toBeTruthy();
  }));
});
