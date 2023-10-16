import { TestBed } from '@angular/core/testing';

import { PreguntaObjetivasService, } from './preguntaObjetiva.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';

describe('PreguntaObjetivaService', () => {
  let service: PreguntaObjetivasService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PreguntaObjetivasService]
    });
    service = TestBed.inject(PreguntaObjetivasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('debería obtener preguntas para un perfil conservador', () => {
    const tipo = 'CONSERVADOR';
    const expectedPreguntas: PreguntaApi[] = [
      { "enunciado":"",
        "descripcion": "¿Qué es un bono y cómo se diferencia de una acción en términos de riesgo y retorno?",
        "tipoComponente": "TEXTO",
        "orden":1,
        "categoria": {
          "nombre": "Test Conocimiento",
          "descripcion":""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion":""
        },
        "respuestas": [
          {
            "nombre": "A- Un bono es una inversión que representa propiedad en una empresa, mientras que una acción representa una deuda.",
            "valor": 0,
            "orden":1
          },
          {
            "nombre": "B- Un bono es una inversión de renta fija con riesgo variable, mientras que una acción es una inversión de renta variable.",
            "valor": 0,
            "orden":2
          },
          {
            "nombre": "C- Un bono es una inversión de renta fija que representa una deuda, mientras que una acción representa propiedad en una empresa.",
            "valor": 5,
            "orden":3
          }
        ]
      }
    ];

    service.getPreguntas(tipo).subscribe((preguntas) => {
      expect(preguntas).toEqual(expectedPreguntas);
    });

    
    // const req = httpTestingController.expectOne((req) => req.url === service.preguntasConservadorUrl);

    const req = httpTestingController.expectOne((req) => req.url === 'assets\\mock\\Perfil Objetivo Conservador V1.0.json');

    expect(req.request.method).toBe('GET');

    req.flush(expectedPreguntas);
  });

  it('debería obtener preguntas para un perfil moderado', () => {
    const tipo = 'MODERADO';
    const expectedPreguntas: PreguntaApi[] = [
      { "enunciado":"",
        "descripcion": "¿Qué significa el término \"ratio de Sharpe\" y cómo se utiliza en la evaluación de carteras de inversión?",
        "tipoComponente": "TEXTO",
        "orden":1,
        "categoria": {
          "nombre": "Test Conocimiento Moderado",
          "descripcion":""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion":""
        },
        "respuestas": [
          {
            "nombre": "A- El ratio de Sharpe mide la rentabilidad absoluta de una inversión.",
            "valor": 0,
            "orden":1
          },
          {
            "nombre": "B- El ratio de Sharpe mide la relación entre el rendimiento y la volatilidad de una inversión y se utiliza para evaluar la eficiencia de una cartera.",
            "valor": 5,
            "orden":2
          },
          {
            "nombre": "C- El ratio de Sharpe mide el rendimiento de una inversión sin tener en cuenta el riesgo asociado.",
            "valor": 0,
            "orden":3
          }
        ]
      },
      { "enunciado":"",
        "descripcion": "¿Qué es un bono y cómo se diferencia de una acción en términos de riesgo y retorno?",
        "tipoComponente": "TEXTO",
        "orden":2,
        "categoria": {
          "nombre": "Test Conocimiento",
          "descripcion":""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion":""
        },
        "respuestas": [
          {
            "nombre": "A- Un bono es una inversión que representa propiedad en una empresa, mientras que una acción representa una deuda.",
            "valor": 0,
            "orden":1
          },
          {
            "nombre": "B- Un bono es una inversión de renta fija con riesgo variable, mientras que una acción es una inversión de renta variable.",
            "valor": 0,
            "orden":2
          },
          {
            "nombre": "C- Un bono es una inversión de renta fija que representa una deuda, mientras que una acción representa propiedad en una empresa.",
            "valor": 5,
            "orden":3
          }
        ]
      }
    ];

    service.getPreguntas(tipo).subscribe((preguntas) => {
      expect(preguntas).toEqual(expectedPreguntas);
    });

    
    // const req = httpTestingController.expectOne((req) => req.url === service.preguntasConservadorUrl);

    const req = httpTestingController.expectOne((req) => req.url === 'assets\\mock\\Perfil Objetivo Moderado V1.0.json');

    expect(req.request.method).toBe('GET');

    req.flush(expectedPreguntas);
  });

  it('debería obtener preguntas para un perfil agresivo', () => {
    
      const tipo = 'AGRESIVO';
      const expectedPreguntas: PreguntaApi[] = [
        { "enunciado":"",
          "descripcion": "¿Qué significa el término \"ratio de Sharpe\" y cómo se utiliza en la evaluación de carteras de inversión?",
          "tipoComponente": "TEXTO",
          "orden":1,
          "categoria": {
            "nombre": "Test Conocimiento Moderado",
            "descripcion":""
          },
          "seccion": {
            "nombre": "Nivel De Conocimiento",
            "descripcion":""
          },
          "respuestas": [
            {
              "nombre": "A- El ratio de Sharpe mide la rentabilidad absoluta de una inversión.",
              "valor": 0,
              "orden":1
            },
            {
              "nombre": "B- El ratio de Sharpe mide la relación entre el rendimiento y la volatilidad de una inversión y se utiliza para evaluar la eficiencia de una cartera.",
              "valor": 5,
              "orden":2
            },
            {
              "nombre": "C- El ratio de Sharpe mide el rendimiento de una inversión sin tener en cuenta el riesgo asociado.",
              "valor": 0,
              "orden":3
            }
          ]
        },
        { "enunciado":"",
          "descripcion": "¿Qué es un bono y cómo se diferencia de una acción en términos de riesgo y retorno?",
          "tipoComponente": "TEXTO",
          "orden":2,
          "categoria": {
            "nombre": "Test Conocimiento",
            "descripcion":""
          },
          "seccion": {
            "nombre": "Nivel De Conocimiento",
            "descripcion":""
          },
          "respuestas": [
            {
              "nombre": "A- Un bono es una inversión que representa propiedad en una empresa, mientras que una acción representa una deuda.",
              "valor": 0,
              "orden":1
            },
            {
              "nombre": "B- Un bono es una inversión de renta fija con riesgo variable, mientras que una acción es una inversión de renta variable.",
              "valor": 0,
              "orden":2
            },
            {
              "nombre": "C- Un bono es una inversión de renta fija que representa una deuda, mientras que una acción representa propiedad en una empresa.",
              "valor": 5,
              "orden":3
            }
          ]
        }
      ];
  
      service.getPreguntas(tipo).subscribe((preguntas) => {
        expect(preguntas).toEqual(expectedPreguntas);
      });
  
      // const req = httpTestingController.expectOne((req) => req.url === service.preguntasConservadorUrl);
  
      const req = httpTestingController.expectOne((req) => req.url === 'assets\\mock\\Perfil Objetivo Arriesgado V1.0.json');
  
      expect(req.request.method).toBe('GET');
  
      req.flush(expectedPreguntas);

  });

  it('debería manejar un tipo de perfil no existente, Traer Preguntas Moderada', () => {
    const tipo = 'INEXISTENTE';
    const expectedPreguntas: PreguntaApi[] = [
      { "enunciado":"",
        "descripcion": "¿Qué significa el término \"ratio de Sharpe\" y cómo se utiliza en la evaluación de carteras de inversión?",
        "tipoComponente": "TEXTO",
        "orden":1,
        "categoria": {
          "nombre": "Test Conocimiento Moderado",
          "descripcion":""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion":""
        },
        "respuestas": [
          {
            "nombre": "A- El ratio de Sharpe mide la rentabilidad absoluta de una inversión.",
            "valor": 0,
            "orden":1
          },
          {
            "nombre": "B- El ratio de Sharpe mide la relación entre el rendimiento y la volatilidad de una inversión y se utiliza para evaluar la eficiencia de una cartera.",
            "valor": 5,
            "orden":2
          },
          {
            "nombre": "C- El ratio de Sharpe mide el rendimiento de una inversión sin tener en cuenta el riesgo asociado.",
            "valor": 0,
            "orden":3
          }
        ]
      },
      { "enunciado":"",
        "descripcion": "¿Qué es un bono y cómo se diferencia de una acción en términos de riesgo y retorno?",
        "tipoComponente": "TEXTO",
        "orden":2,
        "categoria": {
          "nombre": "Test Conocimiento",
          "descripcion":""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion":""
        },
        "respuestas": [
          {
            "nombre": "A- Un bono es una inversión que representa propiedad en una empresa, mientras que una acción representa una deuda.",
            "valor": 0,
            "orden":1
          },
          {
            "nombre": "B- Un bono es una inversión de renta fija con riesgo variable, mientras que una acción es una inversión de renta variable.",
            "valor": 0,
            "orden":2
          },
          {
            "nombre": "C- Un bono es una inversión de renta fija que representa una deuda, mientras que una acción representa propiedad en una empresa.",
            "valor": 5,
            "orden":3
          }
        ]
      }
    ];

    // service.getPreguntas(tipo).subscribe((preguntas) => {
    //   // Verifica cómo manejas este caso en tu servicio (puedes retornar un array vacío o null, por ejemplo)
    // });

   let preguntasUrlMOCK = 'assets\\mock\\Perfil Objetivo Moderado V1.0.json'; // Ruta al archivo JSON

   service.getPreguntas(tipo).subscribe((preguntas) => {
    expect(preguntas).toEqual(expectedPreguntas);
  });
   const req=httpTestingController.expectOne(preguntasUrlMOCK); // Asegúrate de que no se realice una solicitud
  
    expect(req.request.method).toBe('GET');
  
    req.flush(expectedPreguntas);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
