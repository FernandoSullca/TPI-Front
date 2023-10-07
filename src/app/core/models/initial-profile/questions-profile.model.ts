export interface Respuesta {
  nombre: string;
  valor: number;
  seleccionada: boolean;
}

export interface PreguntaBase {
  descripcion: string;
  TipoComponente: string;
  seccion: Seccion;
  respuestas: Respuesta[];
}

export interface Seccion {
  nombre: string;
}
export interface Categoria {
  nombre: string;
  descripcion: string;
}


export interface PreguntaCheckbox extends PreguntaBase {
  TipoComponente: "checkbox";
}

export interface PreguntaRadio extends PreguntaBase {
  TipoComponente: "radio";
}

export interface RespuestaBnt extends Respuesta {
  // Agrega propiedades específicas de RespuestaBnt si es necesario
  // Por ejemplo, si RespuestaBnt tiene una propiedad 'instrumento':
  respuestas: Respuesta[];
  instrumento: string;
}

export interface PreguntaBotones extends PreguntaBase {
  TipoComponente: "boton";
  respuestas: RespuestaBnt[];
}


export interface Cuestionario {
  preguntas: (PreguntaCheckbox | PreguntaRadio | PreguntaBotones)[];
}


// Función para serializar el objeto Cuestionario a un formato JSON
// export function serializarCuestionario(cuestionario: Cuestionario): any {
//   return {
//     preguntas: cuestionario.preguntas.map(pregunta => {
//       const { respuestas, ...preguntaSinRespuestas } = pregunta;
//       return {
//         ...preguntaSinRespuestas,
//         respuestas: respuestas.map(respuesta => {
//           const { respuestas, ...respuestaSinRespuestas } = respuesta;
//           return respuestaSinRespuestas;
//         }),
//       };
//     }),
//   };
// }

export class Titulo {
  constructor(
      public simbolo?: string,
      public puntas?: {
          cantidadCompra: number;
          precioCompra: number;
          precioVenta: number;
          cantidadVenta: number;
      },
      public ultimoPrecio?: number,
      public variacionPorcentual?: number,
      public apertura?: number,
      public maximo?: number,
      public minimo?: number,
      public ultimoCierre?: number,
      public volumen?: number,
      public cantidadOperaciones?: number,
      public fecha?: string,
      public tipoOpcion?: string | null,
      public precioEjercicio?: number | null,
      public fechaVencimiento?: string | null,
      public mercado?: string,
      public moneda?: string,
      public descripcion?: string,
      public plazo?: string,
      public laminaMinima?: number,
      public lote?: number,
  ) {}

    // Método para serializar el objeto JSON recibido desde la API
    public static serializar(json: any): Titulo {
      return new this(
          json.simbolo,
          json.puntas,
          json.ultimoPrecio,
          json.variacionPorcentual,
          json.apertura,
          json.maximo,
          json.minimo,
          json.ultimoCierre,
          json.volumen,
          json.cantidadOperaciones,
          json.fecha,
          json.tipoOpcion,
          json.precioEjercicio,
          json.fechaVencimiento,
          json.mercado,
          json.moneda,
          json.descripcion,
          json.plazo,
          json.laminaMinima,
          json.lote
      );
  }
}