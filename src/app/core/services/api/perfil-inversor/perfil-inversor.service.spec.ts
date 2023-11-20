import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerfilInversorService } from './perfil-inversor.service';

describe('PerfilInversorService', () => {
  let service: PerfilInversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PerfilInversorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
