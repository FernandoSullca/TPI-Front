export class Respuesta {
    constructor(
      public nombre: string,
      public valor: number,
      public instrumento?: string,
      public respuestas?: Respuesta[]
    ) {}
  }
  
  export class Seccion {
    constructor(public nombre: string) {}
  }
  
  export class Pregunta {
    constructor(
      public descripcion: string,
      public TipoComponente: string,
      public seccion: Seccion,
      public respuestas: Respuesta[]
    ) {}
  }
  
  export class Cuestionario {
    constructor(public preguntas: Pregunta[]) {}

    static serializar(json: any): Cuestionario {
        const preguntas = json.preguntas.map((preguntaJSON: any) => {
          const respuestas = preguntaJSON.respuestas.map((respuestaJSON: any) => {
            if (respuestaJSON.respuestas) {
              return new Respuesta(
                respuestaJSON.nombre,
                respuestaJSON.valor,
                respuestaJSON.instrumento,
                respuestaJSON.respuestas.map((subRespuestaJSON: any) => {
                  return new Respuesta(subRespuestaJSON.nombre, subRespuestaJSON.valor);
                })
              );
            } else {
              return new Respuesta(respuestaJSON.nombre, respuestaJSON.valor);
            }
          });
    
          return new Pregunta(
            preguntaJSON.descripcion,
            preguntaJSON.TipoComponente,
            new Seccion(preguntaJSON.seccion.nombre),
            respuestas
          );
        });
    
        return new Cuestionario(preguntas);
      }
}

