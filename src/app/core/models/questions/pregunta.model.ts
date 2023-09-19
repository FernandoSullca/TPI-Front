export interface Pregunta {
    pregunta: string;
    opciones: Opcion[];
  }
  export interface Opcion {
    texto: string;
    correcta: boolean;
  }
  