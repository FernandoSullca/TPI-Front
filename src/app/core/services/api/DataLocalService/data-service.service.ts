import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
 // Aquí puedes definir tus datos ficticios
 private data = {
  tematicas: [
    {
      nombre: 'Acciones',
      descripcion: 'Las acciones representan participaciones en la propiedad de una empresa.'
    },
    {
      nombre: 'Bonos',
      descripcion: 'Los bonos son préstamos emitidos por una entidad que prometen pagar intereses y devolver el capital al vencimiento.'
    }
  ],
  introducciones: [
    // ...
    // Definir introducciones ficticias aquí
    // ...
  ],
  trivias: [
    {
      "tematica": "Interés Compuesto",
      "nivel": 1,
      "preguntas": [
        {
          "pregunta": "¿Cuál es la ventaja clave del interés compuesto?",
          "opciones": [
            {
              "texto": "El crecimiento exponencial del dinero.",
              "correcta": true
            },
            {
              "texto": "La inversión en acciones.",
              "correcta": false
            },
            {
              "texto": "El ahorro a corto plazo.",
              "correcta": false
            }
          ]
        },
        {
          "pregunta": "¿Qué sucede con el interés en el interés compuesto?",
          "opciones": [
            {
              "texto": "Permanece constante a lo largo del tiempo.",
              "correcta": false
            },
            {
              "texto": "Se acumula y se suma al capital original.",
              "correcta": true
            },
            {
              "texto": "Se reduce cada año.",
              "correcta": false
            }
          ]
        }
      ]
    }
  ]
};

  constructor() { }

   // Método para obtener datos ficticios de temáticas
   getTematicas() {
    return this.data.tematicas;
  }
  getTrivias() {
    return this.data.tematicas;
  }

  // Método para obtener trivias por temática
  getTriviasByTematica(tematica: string) {
      // Filtra las trivias por la temática proporcionada
      return this.data.trivias.filter(trivia => trivia.tematica === tematica);
  }
  
}
