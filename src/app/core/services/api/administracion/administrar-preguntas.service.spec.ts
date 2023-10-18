import { TestBed } from '@angular/core/testing';

import { AdministrarPreguntasService } from './administrar-preguntas.service';

describe('AdministrarPreguntasService', () => {
  let service: AdministrarPreguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrarPreguntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
