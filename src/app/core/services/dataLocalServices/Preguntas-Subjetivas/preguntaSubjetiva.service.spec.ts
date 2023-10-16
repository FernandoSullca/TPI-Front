import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { PreguntaSubjetivasService } from './preguntaSubjetiva.service';
import { environment } from 'environments/environment';

describe('PreguntaSubjetivaService', () => {
  let service: PreguntaSubjetivasService;
  let httpTestingController: HttpTestingController;

//Configuración del módulo de prueba y creación de instancias:
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PreguntaSubjetivasService]
    });
    service = TestBed.inject(PreguntaSubjetivasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Prueba de creación del servicio', () => {
    expect(service).toBeTruthy();
  });

});
