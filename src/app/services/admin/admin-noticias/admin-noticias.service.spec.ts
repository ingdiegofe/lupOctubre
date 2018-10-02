import { TestBed, inject } from '@angular/core/testing';

import { AdminNoticiasService } from './admin-noticias.service';

describe('AdminNoticiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminNoticiasService]
    });
  });

  it('should be created', inject([AdminNoticiasService], (service: AdminNoticiasService) => {
    expect(service).toBeTruthy();
  }));
});
