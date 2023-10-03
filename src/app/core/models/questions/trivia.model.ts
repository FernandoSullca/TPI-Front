import { Pregunta } from "./pregunta.model";
export interface Trivia {
    tematica: string;
    nivel: number;
    preguntas: Pregunta[];
}
  