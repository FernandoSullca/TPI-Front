export interface Respuesta {
  nombre: string;
  valor: number;
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
