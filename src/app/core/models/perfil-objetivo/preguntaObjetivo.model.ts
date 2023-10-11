// preguntaObjetivas.model.ts
  export interface Pregunta {
    pregunta: string;
    valor: number;
    tipoContenido: string; // Agrega el campo "tipoContenido"
    descripcion: string;
    opciones: Opcion[];
  }
  
  export interface Opcion {
    texto: string;
    valor:number;
    esVerdadera: boolean;
  }
 
  export interface Respuesta {
    nombre: string;
    valor: number;
    seleccionada: boolean;
  }
  
  export interface RespuestaBnt {
    respuestas: Respuesta[];
    instrumento: string;
  }