// pregunta.model.ts
export interface Pregunta {
    pregunta: string;
    valor: number;
    tipoContenido: string; // Agrega el campo "tipoContenido"
    descripcion: string;
    opciones: Opcion[];
  }
  
  export interface Opcion {
    texto: string;
    esVerdadera: boolean;
  }
  