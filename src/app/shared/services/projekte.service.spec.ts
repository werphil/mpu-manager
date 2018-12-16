import { TestBed, inject } from '@angular/core/testing';

import { ProjekteService } from './projekte.service';

describe('ProjekteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjekteService]
    });
  });

  it('should be created', inject([ProjekteService], (service: ProjekteService) => {
    expect(service).toBeTruthy();
  }));
});
