export class Respuesta {
    constructor( 
      public nombre: string,
      public valor: number,
      public orden: number,
      public instrumento?: string,//Es opcional Va ultimo
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
  
  export interface PreguntaBase {
    descripcion: string;
    TipoComponente: string;
    seccion: Seccion;
    respuestas: RespuestaBnt[];
  }
  export interface RespuestaBnt {
    respuestas: Respuesta[];
    instrumento: string;
  }
    export interface Respuesta {
    nombre: string;
    valor: number;
    orden:number;
  }
  export interface PreguntaBotones extends PreguntaBase {
    respuestas: RespuestaBnt[];
  }
  
  
  export class CuestionarioInitial {

    constructor(public preguntas: Pregunta[]) {}

    // Función de Des-serialización para convertir un objeto JSON en una instancia de Pregunta
    public static serializar(json: any): Pregunta {
    // En esta parte, se crea un array llamado respuestas que almacenará las respuestas de la pregunta. 
    // Se utiliza el método map en json.respuestas para iterar sobre cada respuesta en el JSON y crear una nueva instancia de Respuesta para cada una.
    // Estas instancias se almacenan en el array respuestas. Cada instancia de Respuesta se crea con los valores de nombre, valor e instrumento tomados del objeto JSON.
    const respuestas: Respuesta[] = json.respuestas.map((respuestaJSON: any) => {
      return new Respuesta(respuestaJSON.nombre, respuestaJSON.valor, respuestaJSON.orden,respuestaJSON.instrumento);
    });
    // Esta instancia se inicializa con los valores de descripcion, 
    // TipoComponente y seccion tomados del objeto JSON. Además, 
    // se pasa el array respuestas como parte de la inicialización de la pregunta, 
    // de modo que las respuestas se adjuntan a la instancia de Pregunta.
    return new Pregunta(json.descripcion, json.TipoComponente, new Seccion(json.seccion.nombre), respuestas);
  }
}

function convertirAPreguntaBotones(pregunta: Pregunta): PreguntaBotones {
  const respuestasBnt: RespuestaBnt[] = pregunta.respuestas.map((respuesta) => {
    return {
      respuestas: [respuesta],
      instrumento: respuesta.instrumento || '', // Puedes ajustar el valor predeterminado según sea necesario
    };
  });

  const preguntaBotones: PreguntaBotones = {
    descripcion: pregunta.descripcion,
    TipoComponente: pregunta.TipoComponente,
    seccion: pregunta.seccion,
    respuestas: respuestasBnt,
  };

  return preguntaBotones;
}

// Exporta la función para hacerla accesible desde otros lugares
export { convertirAPreguntaBotones };