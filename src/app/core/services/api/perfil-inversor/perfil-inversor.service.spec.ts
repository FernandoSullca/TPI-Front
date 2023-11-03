import { TestBed } from '@angular/core/testing';

import { PerfilInversorService } from './perfil-inversor.service';

describe('PerfilInversorService', () => {
  let service: PerfilInversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilInversorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
