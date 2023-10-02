export interface Cuestionario {
    preguntas: (PreguntaCheckbox |PreguntaRadio  |PreguntaBotones )[];
  }
export interface Respuesta {
     respuestas: string[];
  
}
export interface RespuestaBnt {
  instrumento: string;
  respuestas: string[];

}

export interface PreguntaBotones {
    descripcion: string;
    tipo: string;
    respuestas: RespuestaBnt[];
  }

    
export interface PreguntaCheckbox {
    descripcion: string;
    tipo:string;
    respuestas: string[];
  }

export interface PreguntaRadio {
    descripcion: string;
    tipo: string;
    respuestas: string[];
}
  
