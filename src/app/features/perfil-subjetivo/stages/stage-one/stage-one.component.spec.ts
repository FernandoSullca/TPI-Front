import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StageOneComponent } from './stage-one.component';
import { PreguntaSubjetivasService } from 'src/app/core/services/dataLocalSercices/Preguntas-Subjetivas/preguntaSubjetiva.service';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
import { of } from 'rxjs';

describe('StageOneComponent', () => {
  let component: StageOneComponent;
  let fixture: ComponentFixture<StageOneComponent>;
  let questionsProfileService: QuestionsProfileService;

  // Creamos stubs de los servicios
  const preguntaSubjetivasServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    getCuestionario: () => of([]),
  };

  const questionsProfileServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    // obtenerTestSubjetivo: () => of({}),
    //Debido al que es por APi es diferente a la declaracion del Lectura observable
    obtenerTestSubjetivo: () => Promise.resolve({ /* datos simulados aquí */ }),
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [StageOneComponent],
      // Utiliza los stubs en lugar de los servicios reales
      providers: [
        { provide: PreguntaSubjetivasService, useValue: preguntaSubjetivasServiceStub },
        { provide: QuestionsProfileService, useValue: questionsProfileServiceStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(StageOneComponent);
    component = fixture.componentInstance;
    questionsProfileService = TestBed.inject(QuestionsProfileService); // Obtiene una instancia del servicio
    fixture.detectChanges();

    spyOn(questionsProfileService, 'obtenerTestSubjetivo').and.returnValue(
      Promise.resolve([
        { "enunciado":"",
          "descripcion": "¿En cuáles de éstos instrumentos has invertido alguna vez?",
          "tipoComponente": "CHECKBOX",
          "orden":0,
          "categoria": {
            "nombre": "Test Inversor",
            "descripcion":""
          },
          "seccion": {
            "nombre": "Tolerancia al riesgo",
            "descripcion":""
          },
          "respuestas": [{
            "nombre": "Plazo Fijo",
            "valor": 0,
            "orden":0
  
          },
          {
            "nombre": "Fondos Comunes de Inversion (De renta fija)",
            "valor": 0,
            "orden":0
  
          },
          {
            "nombre": "Bonos",
            "valor": 1,
            "orden":0
          },
          {
            "nombre": "Acciones",
            "valor": 2,
            "orden":0
  
          },
          {
            "nombre": "Opciones",
            "valor": 3,
            "orden":0
  
          },
          {
            "nombre": "Futuros",
            "valor": 4,
            "orden":0
  
          }
          ]
        }
    ]));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debería cargar las  en el cuestionario API o local', () => {
    component.ngOnInit();
    fixture.detectChanges();

    // Comprueba que las preguntas se carguen correctamente, ya sea del servicio o local
    expect(component.cuestionario).toEqual([{
      "enunciado":"",
      "descripcion": "¿En cuáles de éstos instrumentos has invertido alguna vez?",
      "categoria": {
        "nombre": "Test Inversor",
        "descripcion":""
      },
      "seccion": {
        "nombre": "Tolerancia al riesgo",
        "descripcion":""
      },
      "tipoComponente": "CHECKBOX",
      "orden":0,
      "respuestas": [{
        "nombre": "Plazo Fijo",
        "valor": 0,
        "orden":0
      },
      {
        "nombre": "Fondos Comunes de Inversion (De renta fija)",
        "valor": 0,
        "orden":1

      },
      {
        "nombre": "Bonos",
        "valor": 1,
        "orden":3
      },
      {
        "nombre": "Acciones",
        "valor": 2,
        "orden":4

      },
      {
        "nombre": "Opciones",
        "valor": 3,
        "orden":5

      },
      {
        "nombre": "Futuros",
        "valor": 4,
        "orden":6
      }
      ]
    }]);
  });

  it('debería cargar la primera pregunta en el cuestionario', () => {
    // Datos de prueba para simular this.resCuestionarioAPI Cargo 1 unica Pregunta.
    const mockResCuestionarioAPI = [
      { "enunciado":"",
      "descripcion": "¿En cuáles de éstos instrumentos has invertido alguna vez?",
      "tipoComponente": "CHECKBOX",
      "orden":0,
      "categoria": {
        "nombre": "Test Inversor",
        "descripcion":""
      },
      "seccion": {
        "nombre": "Tolerancia al riesgo",
        "descripcion":""
      },
      "respuestas": [{
        "nombre": "Plazo Fijo",
        "valor": 0,
        "orden":0

      },
      {
        "nombre": "Fondos Comunes de Inversion (De renta fija)",
        "valor": 0,
        "orden":0

      },
      {
        "nombre": "Bonos",
        "valor": 1,
        "orden":0
      },
      {
        "nombre": "Acciones",
        "valor": 2,
        "orden":0

      },
      {
        "nombre": "Opciones",
        "valor": 3,
        "orden":0

      },
      {
        "nombre": "Futuros",
        "valor": 4,
        "orden":0

      }
      ]
    }
    ];
    
    // Asigna los datos simulados a this.resCuestionarioAPI
    component.resCuestionarioAPI = mockResCuestionarioAPI;
  
    // Llama a la función que deseas probar
    component.loadQuestions();
  
    // Realiza expectativas para verificar el comportamiento esperado
    expect(component.cuestionario[0]).toEqual(mockResCuestionarioAPI[0]);
  });
  
});
