import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TestPerfilInversorObjetivoComponent } from './test-perfil-inversor-objetivo.component';
import { PreguntaObjetivasService } from 'src/app/core/services/dataLocalServices/Preguntas-Objetivas/preguntaObjetiva.service';
import { QuestionsTargetService } from 'src/app/core/services/api/target-profile/questions-target-profile.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('TestPerfilInversorObjetivoComponent', () => {
  let component: TestPerfilInversorObjetivoComponent;
  let fixture: ComponentFixture<TestPerfilInversorObjetivoComponent>;

  let preguntaObjetivasServiceAPI: any;

  let router: jasmine.SpyObj<Router>;
  // Creamos stubs de los servicios
  const preguntaObjetivasServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    getPreguntas: () => of([]),
  };

  const questionsProfileTargetServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    // obtenerTestSubjetivo: () => of({}),
    //Debido al que es por APi es diferente a la declaracion del Lectura observable
    obtenerTestObjetivo: () => Promise.resolve<PreguntaApi[]>(
      [{
        "orden": 0,
        "enunciado": "",
        "descripcion": "¿Qué es un bono y cómo se diferencia de una acción en términos de riesgo y retorno?",
        "tipoComponente": "TEXTO",
        "categoria": {
          "nombre": "Test Conocimiento",
          "descripcion": ""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion": ""
        },
        "respuestas": [
          {
            "nombre": "A- Un bono es una inversión que representa propiedad en una empresa, mientras que una acción representa una deuda.",
            "valor": 0,
            "orden": 1
          },
          {
            "nombre": "B- Un bono es una inversión de renta fija con riesgo variable, mientras que una acción es una inversión de renta variable.",
            "valor": 0,
            "orden": 2
          },
          {
            "nombre": "C- Un bono es una inversión de renta fija que representa una deuda, mientras que una acción representa propiedad en una empresa.",
            "valor": 5,
            "orden": 3
          }
        ]
      }]
    ),
    TestObjetivoResultados: () => Promise.resolve({}),
    TestObjetivoResultadosObtenidos: () => Promise.resolve({}),
  };


  let LocalStorageServiceStub: LocalStorageService;

  let CarteraServiceStub: CarteraService;


  beforeEach(() => {
    LocalStorageServiceStub = new LocalStorageService();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TestPerfilInversorObjetivoComponent],
      providers: [
        { provide: PreguntaObjetivasService, useValue: preguntaObjetivasServiceStub },
        { provide: QuestionsTargetService, useValue: questionsProfileTargetServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: LocalStorageServiceStub },
        { provide: CarteraService, usaValue: CarteraServiceStub },
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(TestPerfilInversorObjetivoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
    LocalStorageServiceStub = TestBed.inject(LocalStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar datos y preguntas correctamente', fakeAsync(() => {
    const storedProfileMock = 'Moderado';

    const resPreguntasMock = [
      {
        "orden": 0,
        "enunciado": "",
        "descripcion": "¿Qué es un bono y cómo se diferencia de una acción en términos de riesgo y retorno?",
        "tipoComponente": "TEXTO",
        "categoria": {
          "nombre": "Test Conocimiento",
          "descripcion": ""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion": ""
        },
        "respuestas": [
          {
            "nombre": "A- Un bono es una inversión que representa propiedad en una empresa, mientras que una acción representa una deuda.",
            "valor": 0,
            "orden": 1
          },
          {
            "nombre": "B- Un bono es una inversión de renta fija con riesgo variable, mientras que una acción es una inversión de renta variable.",
            "valor": 0,
            "orden": 2
          },
          {
            "nombre": "C- Un bono es una inversión de renta fija que representa una deuda, mientras que una acción representa propiedad en una empresa.",
            "valor": 5,
            "orden": 3
          }
        ]
      }
    ]; 
 
    const perfilInversorUsuario = {
      oid: 1,
      version: 0,
      horizonteTemporal: 10,
      toleranciaRiesgo: 10,
      tipoPerfilSubjetivo: "Moderado",
      nivelConocimiento: 0,
      tipoNivelConocimiento: "-",
      perfilInversor: "Moderado",
      UsuarioDTO: {
        oid: 0,
        pass: "1234",
        username:"Usuario",
        nombreUsuario: "User",
        nombre: "username",
        apellido: "userLastname",
        email: "email",
        cuentaConfirmada: false,
        activo: false,
      }
    }
    // Espía los servicios reales proporcionados como dependencias
    const localStorageServiceStub = TestBed.inject(LocalStorageService);
    const questionsProfileTargetServiceStub = TestBed.inject(QuestionsTargetService);
   
    // Configura los espías en los métodos de los servicios
    spyOn(localStorageServiceStub, 'getItem').and.returnValue(storedProfileMock);
    spyOn(questionsProfileTargetServiceStub, 'obtenerTestObjetivo').and.returnValue(Promise.resolve(resPreguntasMock));
    spyOn(localStorageServiceStub, 'GetPerfilActualLocal').and.returnValue(perfilInversorUsuario);


    component.ngOnInit();

    // Realiza expectativas para verificar que los datos se han cargado correctamente
    expect(component.resPreguntas).toBeDefined();
    tick();
    expect(component.PerfilSubjetivoObtenido).toEqual(storedProfileMock);
    expect(component.resPreguntas).toEqual(resPreguntasMock);
    expect(component.perfilInversorUsuario).toBeDefined();
    // expect(component.Username).toEqual(perfilInversorUsuario.UsuarioDTO.username);
    expect(component.Username).toBeDefined();

  }));

  it('debería almacenar respuestas en el servicio LocalStorage', () => {
    // Simula que has respondido algunas preguntas
    component.resPreguntas = [
      {
        "orden": 0,
        "enunciado": "",
        "descripcion": "¿Qué es un bono y cómo se diferencia de una acción en términos de riesgo y retorno?",
        "tipoComponente": "TEXTO",
        "categoria": {
          "nombre": "Test Conocimiento",
          "descripcion": ""
        },
        "seccion": {
          "nombre": "Nivel De Conocimiento",
          "descripcion": ""
        },
        "respuestas": [
          {
            "nombre": "A- Un bono es una inversión que representa propiedad en una empresa, mientras que una acción representa una deuda.",
            "valor": 0,
            "orden": 1
          },
          {
            "nombre": "B- Un bono es una inversión de renta fija con riesgo variable, mientras que una acción es una inversión de renta variable.",
            "valor": 0,
            "orden": 2
          },
          {
            "nombre": "C- Un bono es una inversión de renta fija que representa una deuda, mientras que una acción representa propiedad en una empresa.",
            "valor": 5,
            "orden": 3
          }
        ]
      }
    ];
    component.currentQuestionIndex = 0;



    // Llama a la función que deseas probar
    component.loadNextQuestion();

    // Asegúrate de que las respuestas se han almacenado en el servicio LocalStorage
    const respuestasAlmacenadas = LocalStorageServiceStub.getItem('perfilinversor');
    expect(respuestasAlmacenadas).toBeDefined();
    // Realiza más expectativas según lo que necesites verificar
  });

  ///////public async entregarResultados(): Promise<void> ///
  it('debería llamar a TestObjetivoResultados y asignar respuestasPerfil si la API responde correctamente',
    async () => {
      // Simula una respuesta exitosa del servicio API
      const mockResponse = {
        perfilInversor: 'Moderado'
        // Otras propiedades
      };

      component.respuestasPerfil.horizonteTemporal = 10,
        component.respuestasPerfil.toleranciaRiesgo = 10,

        spyOn(questionsProfileTargetServiceStub, 'TestObjetivoResultadosObtenidos').and.returnValue(Promise.resolve(mockResponse));

      // Llama a la función que deseas probar
      await component.entregarResultados();

      // Verifica que respuestasPerfil se haya asignado correctamente
      expect(component.respuestasPerfil.perfilInversor).toEqual(mockResponse.perfilInversor);
    });



  it('debería manejar errores si la API no responde correctamente', async () => {
    // Simula una respuesta de error del servicio API
    spyOn(questionsProfileTargetServiceStub, 'TestObjetivoResultados').and.returnValue(Promise.reject('Error al enviar los resultados'));

    // Llama a la función que deseas probar
    await component.entregarResultados();

    // Verifica que se haya manejado el error adecuadamente (puedes comprobar logs, estados, etc.)
    // expect(component.respuestasPerfil).toBeUndefined(); // Por ejemplo, se podría establecer en undefined en caso de error
    expect(component.respuestasPerfil).toEqual([]);
  });

  //Navegabilidad
  it('Deberia navegar al /dashboard/precios al home de proyecto ', () => {

    component.loadHome();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/precios']);
  }
  );
});
