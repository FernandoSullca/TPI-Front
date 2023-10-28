import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { PreguntaSubjetivasService } from './preguntaSubjetiva.service';
// import { environment } from 'src/app/core/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';
import { of, throwError } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';

describe('PreguntaSubjetivaService', () => {
  let service: PreguntaSubjetivasService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
//Configuración del módulo de prueba y creación de instancias:
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PreguntaSubjetivasService]
    });
    service = TestBed.inject(PreguntaSubjetivasService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PreguntaSubjetivasService(httpClientSpy);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Prueba de creación del servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia obtener una lista de Preguntas via Get', (done: DoneFn) => {
    const expectedPregunta: PreguntaApi[] =
      [
    {
        "enunciado": "Pregunta 1",
        "descripcion": "¿En cuáles de éstos instrumentos has invertido alguna vez?",
        "tipoComponente": "CHECKBOX",
        "orden": 0,
        "categoria": {
          "nombre": "Test Inversor",
          "descripcion": ""
        },
        "seccion": {
          "nombre": "Tolerancia al riesgo",
          "descripcion": ""
        },
        "respuestas": [{
          "nombre": "Plazo Fijo",
          "valor": 0,
          "orden": 0

        },
        {
          "nombre": "Fondos Comunes de Inversion (De renta fija)",
          "valor": 0,
          "orden": 0

        },
        {
          "nombre": "Bonos",
          "valor": 1,
          "orden": 0
        },
        {
          "nombre": "Acciones",
          "valor": 2,
          "orden": 0

        },
        {
          "nombre": "Opciones",
          "valor": 3,
          "orden": 0

        },
        {
          "nombre": "Futuros",
          "valor": 4,
          "orden": 0

        }
        ]
     }
    ];
  
    httpClientSpy.get.and.returnValue(of(expectedPregunta));
  
    service.getCuestionario().subscribe({
      next: preguntas => {
        expect(preguntas)
          .withContext('expected preguntas')
          .toEqual(expectedPregunta);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('Debería manejar una situación en la que el archivo no se encuentra', (done: DoneFn) => {
    // Simula un error cuando se llama a http.get
    httpClientSpy.get.and.returnValue(throwError({ status: 404, statusText: 'Not Found' }));

    service.getCuestionario().subscribe({
      next: () => done.fail('No debería haber tenido éxito'),
      error: error => {
        expect(error.status).toBe(404); // Verifica el código de estado
        expect(error.statusText).toBe('Not Found'); // Verifica el mensaje de estado
        done(); // Llama a done para finalizar la prueba
      }
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
