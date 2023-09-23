// import { Tematica } from "./tematica.model"; 
// import { Introduccion } from "./introduccion.model"; 
// import { Trivia } from "./trivia.model";
// export interface Questions {
//     tematicas: Tematica[];
//     introducciones: Introduccion[];
//     trivias: Trivia[];
// }

// questions.models.ts
export interface Tematica {
    nombre: string;
    descripcion: string;
}

export interface Introduccion {
    tematica: string;
    titulo: string;
    contenido: string;
    nivel: number;
    preguntas: Pregunta[];
}
export interface Trivia {
    tematica: string;
    nivel: number;
    preguntas: Pregunta[];
}


export interface Opcion {
    texto: string;
    correcta: boolean;
}

export interface Pregunta {
    pregunta: string;
    opciones: Opcion[];
}

export namespace Questions {
    export interface Tematicas {
        tematicas: Tematica[];
    }

    export interface Introducciones {
        introducciones: Introduccion[];
    }

    export interface Trivias {
        trivias: Trivia[];
    }

    export interface QuestionsData {
        tematicas: Tematicas;
        introducciones: Introducciones;
        trivias: Trivias;
    }
}