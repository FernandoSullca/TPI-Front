import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src\\app\\core\\services\\api\\questions\\question.service' // Reemplaza con la ubicación real de tu servicio
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';


@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.scss']
})

export class AccionesComponent implements OnInit {
  HardcodePreguntas={
    "tematicas": [
      {
        "nombre": "Acciones",
        "descripcion": "Las acciones representan participaciones en la propiedad de una empresa."
      },
      {
        "nombre": "Bonos",
        "descripcion": "Los bonos son préstamos emitidos por una entidad que prometen pagar intereses y devolver el capital al vencimiento."
      }
    ],
    "introducciones": [
      {
        "tematica": "Acciones",
        "titulo": "Introducción a las Acciones",
        "contenido": "En este tutorial, aprenderás sobre las acciones y su funcionamiento.",
        "nivel": 1,
        "preguntas": [
          {
            "pregunta": "¿Qué es una acción?",
            "opciones": [
              {
                "texto": "Una acción representa una participación en la propiedad de una empresa.",
                "correcta": true
              },
              {
                "texto": "Una acción es un tipo de bono emitido por el gobierno.",
                "correcta": false
              },
              {
                "texto": "Una acción es un préstamo a corto plazo.",
                "correcta": false
              },
              {
                "texto": "Esta opcion no es",
                "correcta": false
              }
            ]
          },
          {
            "pregunta": "¿Cómo se llaman las personas que poseen acciones de una empresa?",
            "opciones": [
              {
                "texto": "Accionistas",
                "correcta": true
              },
              {
                "texto": "Bonistas",
                "correcta": false
              },
              {
                "texto": "Inversionistas",
                "correcta": false
              },
              {
                "texto": "Esta opcion no es",
                "correcta": false
              }
            ]
          }
        ]
      },
      {
        "tematica": "Bonos",
        "titulo": "Introducción a los Bonos",
        "contenido": "En este tutorial, aprenderás sobre los bonos y su funcionamiento.",
        "nivel": 1,
        "preguntas": [
          {
            "pregunta": "¿Qué es un bono?",
            "opciones": [
              {
                "texto": "Un bono es un préstamo que emite una entidad y que promete pagar intereses y devolver el capital al vencimiento.",
                "correcta": true
              },
              {
                "texto": "Un bono es una acción que representa la propiedad de una empresa.",
                "correcta": false
              },
              {
                "texto": "Un bono es una inversión en bienes raíces.",
                "correcta": false
              },
              {
                "texto": "Esta opcion no es",
                "correcta": false
              }
            ]
          },
          {
            "pregunta": "¿Cómo se llama el interés que se paga periódicamente a los titulares de bonos?",
            "opciones": [
              {
                "texto": "Cupón",
                "correcta": true
              },
              {
                "texto": "Dividendo",
                "correcta": false
              },
              {
                "texto": "Prima",
                "correcta": false
              },
              {
                "texto": "Esta opcion no es",
                "correcta": false
              }
            ]
          }
        ]
      }
    ],
    "trivias": [
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
              },
              {
                "texto": "Esta opcion no es",
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
                "texto": "Esta opcion no es",
                "correcta": false
              }
            ]
          }
        ]
      },
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
                "texto": "Esta opcion no es",
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
                "texto": "Esta opcion no es",
                "correcta": false
              }
            ]
          }
        ]
      }
    ]
  }
  
  respQuestions:  any;
  
  currentQuestion: string='';
  trivias: Trivia[]=[];
  options: Opcion[]=[];
   quest:Pregunta= {
        pregunta: '',
        opciones: []
   };
 

  isLastQuestion: boolean = false;
  currentQuestionIndex: number=0;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    // Carga las preguntas desde el archivo JSON cuando se inicie el componente
    this.loadNextQuestion();
  }

  loadQuestion(): void {
    this.trivias=this.HardcodePreguntas.trivias;
    this.quest=this.getQuestion(this.trivias);
    this.options=this.getOptions(this.trivias);
  }

  loadNextQuestion(): void {
    // Asegúrate de que HardcodePreguntas esté disponible y contenga los datos necesarios
    if (this.HardcodePreguntas && this.HardcodePreguntas.trivias) {
      // Obtén las trivias de HardcodePreguntas
      const trivias = this.HardcodePreguntas.trivias;
  
      // Verifica si todavía hay preguntas disponibles
      if (this.currentQuestionIndex < trivias.length) {
        // Obtiene la trivia actual
        const currentTrivia = trivias[this.currentQuestionIndex];
  
        // Obtén la primera pregunta de la trivia actual
        const currentQuestion = currentTrivia.preguntas[0];
  
        // Obtén las opciones para la pregunta actual
        const options = currentQuestion.opciones;
  
        // Asigna los valores a las propiedades del componente
        this.trivias = trivias;
        this.quest = currentQuestion;
        this.options = options;
  
        // Incrementa el índice para la próxima pregunta
        this.currentQuestionIndex++;
      } else {
        // Si no hay más preguntas, puedes mostrar un mensaje o realizar otra acción
        console.log('Has respondido todas las preguntas.');
      }
    } else {
      console.error('Error: HardcodePreguntas no contiene datos válidos.');
    }
  }
  
  getTriviaQuestions(){

    console.log(this.respQuestions);
    console.log(this.respQuestions.Trivias);
    this.trivias=this.respQuestions.Trivias;
  }

  getQuestion(tr: Trivia[]): Pregunta  {

    if (tr && tr.length > 0 && tr[0].preguntas && tr[0].preguntas.length > 0) {
      return tr[0].preguntas[0];
    } else {
      return {
        pregunta: '',  
        opciones: []   
      };
    }

  }
  getOptions(tr: Trivia[]): Opcion[] {

    if (tr && tr.length > 0 && tr[0].preguntas) {
      return tr[0].preguntas[0].opciones || [];
    } else {
      return [];
    }
  }


  onOptionSelected(option: string): void {
    // Lógica para manejar la selección de una opción (verificar si es correcta, etc.)
    // Puedes implementar esto según tus necesidades.
    // Aquí puedes llamar a loadNextQuestion() para cargar la siguiente pregunta.
  }

}
