import {Pregunta} from './pregunta.model' 
export interface Introduccion {
    tematica: string;
    titulo: string;
    contenido: string;
    nivel: number;
    preguntas: Pregunta[];
}
  