import { TestBed } from '@angular/core/testing';

import { AdministrarPreguntasService } from './administrar-preguntas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdministrarPreguntasService', () => {
  let service: AdministrarPreguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(AdministrarPreguntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});