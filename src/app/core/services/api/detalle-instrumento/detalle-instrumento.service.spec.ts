import { TestBed } from '@angular/core/testing';

import { DetalleInstrumentoService } from './detalle-instrumento.service';

describe('GraficoVelaService', () => {
  let service: DetalleInstrumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleInstrumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
