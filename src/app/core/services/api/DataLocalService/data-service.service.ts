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
    ///Acciones
    {
      "tematica": "Acciones",
      "nivel": 1,
      "preguntas": [
        {
          "pregunta": "¿Cuál es una ventaja de invertir en acciones?",
          "opciones": [
            {
              "texto": "Posibilidad de obtener dividendos.",
              "correcta": true
            },
            {
              "texto": "Rentabilidad fija garantizada.",
              "correcta": false
            },
            {
              "texto": "Ausencia de riesgo.",
              "correcta": false
            }
            ,
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        },
        {
          "pregunta": "¿Qué se entiende por el término 'blue chip' en el contexto de las acciones?",
          "opciones": [
            {
              "texto": "Acciones de empresas líderes y estables.",
              "correcta": true
            },
            {
              "texto": "Acciones con alto riesgo de volatilidad.",
              "correcta": false
            },
            {
              "texto": "Acciones emitidas por el gobierno.",
              "correcta": false
            },
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        }
      ]
    },
    ///BONOS
    {
      "tematica": "Bonos",
      "nivel": 1,
      "preguntas": [
        {
          "pregunta": "¿Qué se conoce como 'cupón' en los bonos?",
          "opciones": [
            {
              "texto": "Los intereses periódicos que se pagan a los titulares de bonos.",
              "correcta": true
            },
            {
              "texto": "El valor nominal de un bono.",
              "correcta": false
            },
            {
              "texto": "El precio actual de un bono en el mercado.",
              "correcta": false
            },
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        },
        {
          "pregunta": "¿Qué tipo de entidad emite bonos?",
          "opciones": [
            {
              "texto": "Entidades financieras, corporaciones o gobiernos.",
              "correcta": true
            },
            {
              "texto": "Acciones de empresas líderes y estables.",
              "correcta": false
            },
            {
              "texto": "Empresas de tecnología.",
              "correcta": false
            },
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        }
      ]
    },
    ///INTERESES COMPUESTOS
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
            },
            {
              "texto": "Esta opcion no es.",
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
            },
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        }
      ]
    },///INSTRUMENTOS
    {
      "tematica": "Instrumentos",
      "nivel": 1,
      "preguntas": [
        {
          "pregunta": "¿Qué papel desempeñan los instrumentos financieros en las inversiones?",
          "opciones": [
            {
              "texto": "No tienen ningún papel en las inversiones.",
              "correcta": false
            },
            {
              "texto": "Facilitan la diversificación y gestión de carteras de inversión.",
              "correcta": true
            },
            {
              "texto": "Solo son útiles para las empresas.",
              "correcta": false
            },
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        },
        {
          "pregunta": "¿Cuál es una característica común de los instrumentos financieros?",
          "opciones": [
            {
              "texto": "Son siempre iguales y no varían en valor.",
              "correcta": false
            },
            {
              "texto": "Pueden variar en valor y generar ganancias o pérdidas.",
              "correcta": true
            },
            {
              "texto": "Solo están disponibles para inversionistas profesionales.",
              "correcta": false
            },
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        }
      ]
    },///OPCIONES
    {
      "tematica": "Opciones",
      "nivel": 1,
      "preguntas": [
        {
          "pregunta": "¿En qué se diferencian las opciones financieras de las acciones?",
          "opciones": [
            {
              "texto": "Las opciones son contratos que otorgan derechos de compra o venta, mientras que las acciones representan propiedad en una empresa.",
              "correcta": true
            },
            {
              "texto": "No hay diferencias, son iguales.",
              "correcta": false
            },
            {
              "texto": "Las opciones son más caras que las acciones.",
              "correcta": false
            },
            {
              "texto": "Esta opcion no es.",
              "correcta": false
            }
          ]
        },
        {
          "pregunta": "¿Para qué pueden utilizarse las opciones financieras?",
          "opciones": [
            {
              "texto": "Solo para comprar bienes raíces.",
              "correcta": false
            },
            {
              "texto": "Para tomar decisiones estratégicas en inversiones y gestionar riesgos.",
              "correcta": true
            },
            {
              "texto": "Solo para invertir en acciones.",
              "correcta": false
            },
            {
              "texto": "Esta opcion no es.",
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
