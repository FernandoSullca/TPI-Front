import { TestBed } from '@angular/core/testing';
import { QuestionsTargetService} from './questions-target-profile.service'
import axios from 'axios';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';

describe('QuestionsTargetProfileService', () => {
  let service:QuestionsTargetService;
  const AxiosResponse={
    perfilInversor:"Moderado"
  }
  const AxiosResponseConservador:PreguntaApi[]=[
  {
    "enunciado":"",
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
]

  const mockAxiosResponse = new Promise((resolver) => {
    return resolver({ data: AxiosResponse})

})
  const mockAxiosResponseObjetivoConservador = new Promise((resolver) => {
  return resolver({ data: AxiosResponseConservador})

  })
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[QuestionsTargetService]
    });
    service = TestBed.inject(QuestionsTargetService);;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería manejar la solicitud de preguntas objetivas y la respuesta exitosa TIPO CONSERVADOR', async () => {
    const tipoPerfil = 'CONSERVADOR';

    spyOn(axios, 'get').and.returnValue(mockAxiosResponseObjetivoConservador);

    const result = await service.obtenerTestObjetivo(tipoPerfil);
    expect(result).toEqual(AxiosResponseConservador);
  });

  it('debería manejar la solicitud de perfil Actualizado y la respuesta exitosa', async () => {
    const analisisObjetivo = {
      horizonteTemporal: 3,
      toleranciaRiesgo: 2,
      Conocimento: 5,
    };
    const username:string="fer";
    spyOn(axios, 'post').and.returnValue(mockAxiosResponse);
    const result = await service.TestObjetivoResultados(analisisObjetivo,username);

   expect(result.perfilInversor).toEqual('Moderado' );
  
   return service.TestObjetivoResultados(analisisObjetivo,username).then((data) => {
     
        expect(data).toHaveSize(1);
        expect(data.perfilInversor).toBe('Moderado');
    
    })
    
  });

});
