import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestPerfilSubjetivoComponent } from './test-perfil-subjetivo.component';
import { PreguntaSubjetivasService } from 'src/app/core/services/dataLocalServices/Preguntas-Subjetivas/preguntaSubjetiva.service';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { of } from 'rxjs';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';

describe('TestPerfilSubjetivoComponent', () => {
  let component: TestPerfilSubjetivoComponent;
  let fixture: ComponentFixture<TestPerfilSubjetivoComponent>;
  let questionsProfileService: QuestionsProfileService;

  // Creamos stubs de los servicios
  const preguntaSubjetivasServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    getCuestionario: () => of([
      {
        "enunciado": "",
        "descripcion": "¿En cuáles de éstos instrumentos has invertido alguna vez?",
        "categoria": {
          "nombre": "Test Inversor",
          "descripcion": ""
        },
        "seccion": {
          "nombre": "Tolerancia al riesgo",
          "descripcion": ""
        },
        "tipoComponente": "CHECKBOX",
        "orden": 0,
        "respuestas": [{
          "nombre": "Plazo Fijo",
          "valor": 0,
          "orden": 0
        },
        {
          "nombre": "Fondos Comunes de Inversion (De renta fija)",
          "valor": 0,
          "orden": 1

        },
        {
          "nombre": "Bonos",
          "valor": 1,
          "orden": 3
        },
        {
          "nombre": "Acciones",
          "valor": 2,
          "orden": 4

        },
        {
          "nombre": "Opciones",
          "valor": 3,
          "orden": 5

        },
        {
          "nombre": "Futuros",
          "valor": 4,
          "orden": 6
        }
        ]
      }]),
    apiUrlMOCK: 'assets\\mock\\Perfil subjetivo V2.0.json', //Url de la interfaz
    // http: {
    //   get: () => {
    //     // Aquí podrías proporcionar una función simulada de HttpClient si es necesario.
    //     // Esta función debe devolver un Observable similar a lo que se espera en la función real.
    //     return of([ 
    //       {
    //       "enunciado": "",
    //       "descripcion": "¿En cuáles de éstos instrumentos has invertido alguna vez?",
    //       "categoria": {
    //         "nombre": "Test Inversor",
    //         "descripcion": ""
    //       },
    //       "seccion": {
    //         "nombre": "Tolerancia al riesgo",
    //         "descripcion": ""
    //       },
    //       "tipoComponente": "CHECKBOX",
    //       "orden": 0,
    //       "respuestas": [{
    //         "nombre": "Plazo Fijo",
    //         "valor": 0,
    //         "orden": 0
    //       },
    //       {
    //         "nombre": "Fondos Comunes de Inversion (De renta fija)",
    //         "valor": 0,
    //         "orden": 1

    //       },
    //       {
    //         "nombre": "Bonos",
    //         "valor": 1,
    //         "orden": 3
    //       },
    //       {
    //         "nombre": "Acciones",
    //         "valor": 2,
    //         "orden": 4

    //       },
    //       {
    //         "nombre": "Opciones",
    //         "valor": 3,
    //         "orden": 5

    //       },
    //       {
    //         "nombre": "Futuros",
    //         "valor": 4,
    //         "orden": 6
    //       }
    //       ]
    //     }]);
    //   },
    // },
  };

  const questionsProfileServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    // obtenerTestSubjetivo: () => of({}),
    //Debido al que es por APi es diferente a la declaracion del Lectura observable
    obtenerTestSubjetivo: () => Promise.resolve({
      "enunciado": "",
      "descripcion": "¿En cuáles de éstos instrumentos has invertido alguna vez?",
      "categoria": {
        "nombre": "Test Inversor",
        "descripcion": ""
      },
      "seccion": {
        "nombre": "Tolerancia al riesgo",
        "descripcion": ""
      },
      "tipoComponente": "CHECKBOX",
      "orden": 0,
      "respuestas": [{
        "nombre": "Plazo Fijo",
        "valor": 0,
        "orden": 1
      },
      {
        "nombre": "Fondos Comunes de Inversion (De renta fija)",
        "valor": 0,
        "orden": 2

      },
      {
        "nombre": "Bonos",
        "valor": 1,
        "orden": 3
      },
      {
        "nombre": "Acciones",
        "valor": 2,
        "orden": 4

      },
      {
        "nombre": "Opciones",
        "valor": 3,
        "orden": 5

      },
      {
        "nombre": "Futuros",
        "valor": 4,
        "orden": 6
      }
      ]
    }),
  };

  const localStorageServiceMock = {
    getItem: (key: string) => {
      // Simula el comportamiento de getItem, devolviendo el valor correspondiente al key
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    setItem: (key: string, value: any) => {
      // Simula el comportamiento de setItem, guardando el valor correspondiente al key
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
      // Simula el comportamiento de removeItem, eliminando el valor correspondiente al key
      localStorage.removeItem(key);
    },
    UpdatePerfilActualLocal: () => {
      localStorage.setItem('Perfil','Moderado')
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestPerfilSubjetivoComponent],
      // Utiliza los stubs en lugar de los servicios reales
      providers: [
        { provide: PreguntaSubjetivasService, useValue: preguntaSubjetivasServiceStub },
        { provide: QuestionsProfileService, useValue: questionsProfileServiceStub },
        { provide: LocalStorageService, useValue: localStorageServiceMock },

      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestPerfilSubjetivoComponent);
    component = fixture.componentInstance;
    questionsProfileService = TestBed.inject(QuestionsProfileService); // Obtiene una instancia del servicio
    fixture.detectChanges();

    spyOn(questionsProfileService, 'obtenerTestSubjetivo').and.returnValue(
      Promise.resolve([
        {
          "enunciado": "",
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
      ]));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('debería cargar la primera pregunta en el cuestionario', () => {
    // Datos de prueba para simular this.resCuestionarioAPI Cargo 1 unica Pregunta.
    const mockResCuestionarioAPI = [
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

    // Asigna los datos simulados a this.resCuestionarioAPI
    component.resCuestionarioAPI = mockResCuestionarioAPI;

    // Llama a la función que deseas probar
    component.loadQuestions();

    // Realiza expectativas para verificar el comportamiento esperado
    expect(component.cuestionario).toEqual(mockResCuestionarioAPI[0]);
  });

  it('debería cargar la siguiente pregunta en el cuestionario', () => {
    // Datos de prueba para simular this.resCuestionarioAPI
    const mockResCuestionarioAPI = [
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
      },
      {
        "enunciado": "Pregunta 2",
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

    // Asigna los datos simulados a this.resCuestionarioAPI
    component.resCuestionarioAPI = mockResCuestionarioAPI;

    // Configura el índice actual en 0 (primera pregunta)
    component.currentQuestionIndex = 0;

    // Llama a la función que deseas probar
    component.loadNextQuestion();

    // Verifica si la próxima pregunta se ha cargado correctamente
    expect(component.cuestionario).toEqual(mockResCuestionarioAPI[1]);
    expect(component.currentQuestionIndex).toEqual(1);
  });
  it('debería finalizar la carga si no hay más preguntas', () => {
    // Datos de prueba para simular this.resCuestionarioAPI
    const mockResCuestionarioAPI = [
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

    // Asigna los datos simulados a this.resCuestionarioAPI
    component.resCuestionarioAPI = mockResCuestionarioAPI;

    // Configura el índice actual en 0 (única pregunta),
    // Si pongo lista , que marque el Ultimo
    component.currentQuestionIndex = 0;

    // Espía la función de finalización para verificar si se llamó
    spyOn(component, 'FinalizarTestSubjetivo');

    // Llama a la función que deseas probar
    component.loadNextQuestion();

    // Verifica si la función de finalización se llamó .toHaveBeenCalled()
    expect(component.FinalizarTestSubjetivo).toHaveBeenCalled();
  });

  it('debería guardar respuestas para preguntas de tipo CHECKBOX', () => {
    const seccion = 'Tolerancia al riesgo';
    const tipo = 'CHECKBOX';
    component.opcionesSeleccionadas = [{ seccion: "Tolerancia al riesgo", pregunta: "", valor: 1 }, { seccion: "Tolerancia al riesgo", pregunta: "", valor: 10 }, { seccion: "Tolerancia al riesgo", pregunta: "", valor: 20 }];

    component.guardarrespuestas(seccion, tipo);

    // Verifica que las respuestas se guarden correctamente en AnalisisSubjetivo
    expect(component.AnalisisSubjetivo[seccion]).toBe(31);

  });
  it('debería sumar valores de un arreglo de checkboxes', () => {

    component.opcionesSeleccionadas = [{ seccion: "Tolerancia al riesgo", pregunta: "", valor: 1 }, { seccion: "Tolerancia al riesgo", pregunta: "", valor: 1 }, { seccion: "Tolerancia al riesgo", pregunta: "", valor: 4 }];
    component.AnalisisSubjetivo = {};
    component.guardarrespuestas('seccion', 'CHECKBOX');
    expect(component.AnalisisSubjetivo['seccion']).toBe(6);
  });

  
  it('debería sumar valores de un arreglo de checkboxes Vaciado de opciones', () => {

    component.opcionesSeleccionadas = [{ seccion: "Tolerancia al riesgo", pregunta: "", valor: 1 }, 
    { seccion: "Tolerancia al riesgo", pregunta: "", valor: 1 },
     { seccion: "Tolerancia al riesgo", pregunta: "", valor: 4 }];
    component.AnalisisSubjetivo = {};
    component.guardarrespuestas('seccion', 'CHECKBOX');
    expect(component.opcionesSeleccionadas).toBeNull;
    expect(component.AnalisisSubjetivo['seccion']).toBe(6);
  });

  it('debería guardar respuestas para preguntas de tipo RADIO', () => {
    const seccion = 'Tolerancia al riesgo';
    const tipo = 'RADIO';

    component.opcionSeleccionada = 5;

    component.guardarrespuestas(seccion, tipo);

    // Verifica que las respuestas se guarden correctamente en AnalisisSubjetivo
    expect(component.AnalisisSubjetivo[seccion]).toBe(5);

  });

  it('debería asignar un valor de radio', () => {
    component.opcionSeleccionada = 5;
    component.AnalisisSubjetivo = {};
    component.guardarrespuestas('seccion', 'RADIO');
    expect(component.opcionSeleccionada).toBeNull;
    expect(component.AnalisisSubjetivo['seccion']).toBe(5);
  });

  it('debería guardar respuestas para preguntas de tipo BOTON', () => {
    const seccion = 'Tolerancia al riesgo';
    const tipo = 'BOTON';

    // Define un conjunto de respuestas seleccionadas por instrumento (simulando las respuestas del usuario)
    component.respuestasSeleccionadasPorInstrumento = {
      instrumento1: 5,
      instrumento2: 10,
      instrumento3: 15,
    };

    // Llama a la función para guardar las respuestas
    component.guardarrespuestas(seccion, tipo);

    // Verifica que las respuestas se hayan guardado correctamente en AnalisisSubjetivo
    expect(component.AnalisisSubjetivo[seccion]).toBe(30);
  });

  it('debería sumar valores de un conjunto de botones', () => {
    component.respuestasSeleccionadasPorInstrumento = { instrumento1: 2, instrumento2: 3 };
    component.AnalisisSubjetivo = {};
    component.guardarrespuestas('seccion', 'BOTON');
    expect(component.AnalisisSubjetivo['seccion']).toBe(5);
    expect(component.respuestasSeleccionadasPorInstrumento).toBeNull;
    expect(component.respuestasSeleccionadasPorInstrumento['instrumento1']).toBe(0);
    expect(component.respuestasSeleccionadasPorInstrumento['instrumento2']).toBe(0);
  });
  
  it('debería manejar un caso predeterminado', () => {
    // Supongamos que el código no muestra mensajes de error, solo realiza acciones específicas para cada tipo.
    component.AnalisisSubjetivo = {};
    component.guardarrespuestas('seccion', 'OTRO_TIPO');
    // Agregar expect o aserciones según lo que se espera que haga en el caso predeterminado.
  });


  it('debería manejar un tipo de pregunta no reconocido', () => {
    const seccion = 'Seccion Desconocida';
    component.opcionesSeleccionadas = [{ seccion: "Tolerancia al riesgo", pregunta: "", valor: 1 }]
    component.AnalisisSubjetivo = {};
    component.AnalisisSubjetivo["Horizonte Temporal"] = 10;
    const consoleErrorSpy = spyOn(console, 'error');

    component.guardarrespuestas(seccion, 'OTRO_TIPO');
  
    expect(component.AnalisisSubjetivo['Seccion Desconocida']).toBeNull;
    expect(component.AnalisisSubjetivo['Seccion Desconocida']).toBe(0);
    expect(component.AnalisisSubjetivo["Horizonte Temporal"]).toBe(10);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Tipo de pregunta no reconocido-para valorizar respuesta');
  
  });

  it('debería validar contenido para resultados exitosamente', async () => {

    // Crea un mock del servicio API
    const profileServiceAPIMock = jasmine.createSpyObj('QuestionsProfileService', ['TestSubjetivoResultadosObtenidos']);

    profileServiceAPIMock.TestSubjetivoResultadosObtenidos.and.resolveTo(
      Promise.resolve({
        toleranciaRiesgo: 10,
        horizonteTemporal: 10,
        perfilInversor: "Moderado",
      }));

    //   const component = new StageOneComponent(
    //     profileServiceAPIMock,preguntaSubjetivasServiceStub,RouterTestingModule ,localStorageServiceMock
    // );
    component.AnalisisSubjetivo["Tolerancia al riesgo"] = 10;
    component.AnalisisSubjetivo["Horizonte Temporal"] = 10;

    // Llama a la función directamente
    const resultados = await component.entregarResultados();
    expect(component.validateData).toBeTruthy();
    // Verifica que los resultados sean los esperados
    // expect(resultados).toEqual({
    // profileServiceAPIMock.TestSubjetivoResultadosObtenidos.and.returnValue(Promise.resolve({
    //   toleranciaRiesgo: 10,
    //   horizonteTemporal: 10,
    //   perfilInversor: "Moderado",
    // }));


    // expect(component.perfilInversorUsuario.perfilInversor).toEqual("Moderado");

  });

});