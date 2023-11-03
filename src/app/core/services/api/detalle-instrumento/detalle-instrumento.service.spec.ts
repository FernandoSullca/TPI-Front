import { TestBed } from '@angular/core/testing';

import { DetalleInstrumentoService } from './detalle-instrumento.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GraficoVelaService', () => {
  let service: DetalleInstrumentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetalleInstrumentoService]
    });

    service = TestBed.inject(DetalleInstrumentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
