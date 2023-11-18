import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { QuestionsProfileService } from './questions-profile.service';
import { environment } from 'environments/environment';

import axios from 'axios';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';
describe('QuestionsProfileService', () => {
  let service: QuestionsProfileService;
  let httpTestingController: HttpTestingController;


  const AxiosResponse={
    perfilInversor:"Moderado"
  }

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
  const mockAxiosResponse = new Promise((resolver) => {
    return resolver({ data: AxiosResponse})

})
const mockAxiosResponseTest = new Promise((resolver) => {
  return resolver({ data: expectedPregunta})

})
  beforeEach((
    ) => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[QuestionsProfileService]
    });
    service = TestBed.inject(QuestionsProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

//Limpiezas de Solicitudes
//En el bloque afterEach, llamamos a httpTestingController.verify() 
//para asegurarnos de que no haya solicitudes pendientes sin responder y limpiar las expectativas
afterEach(() => {
  httpTestingController.verify();
});


it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('debería manejar la solicitud de preguntas Subjetivas API/Lista de Preguntas', async () => {
    // Define un tipo de perfil (por ejemplo, 'CONSERVADOR') que desees probar
 

    // Mockea la llamada a axios.get y devuelve el valor de mockAxiosResponse
    spyOn(axios, 'get').and.returnValue(mockAxiosResponseTest);

    // Llama a la función que deseas probar
    const result = await service.obtenerTestSubjetivo();

    // Verifica que la función devuelva los datos esperados
    expect(result).toEqual(expectedPregunta);

    // También puedes realizar otras expectativas según tus necesidades
    // Por ejemplo, verifica la longitud de las preguntas o algún valor específico.
  });
  it('debería manejar la solicitud de perfil Actualizado y la respuesta exitosa', async () => {
    // Llama a la función que deseas probar
    const analisisObjetivo = {
      horizonteTemporal: 3,
      toleranciaRiesgo: 2,
      Conocimento: 5,
    };
   const username:String="fernando"
    spyOn(axios, 'post').and.returnValue(mockAxiosResponse);
    const result = await service.TestSubjetivoResultados(analisisObjetivo,username);

    // Verifica que la función devuelva los datos esperados
   expect(result.perfilInversor).toEqual('Moderado' );
  
   return service.TestSubjetivoResultados(analisisObjetivo,username).then((data) => {
     
        expect(data).toHaveSize(1);
        expect(data.perfilInversor).toBe('Moderado');
    
    })
    
  });
});