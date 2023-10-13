export class CategoriaAPI {
    constructor( 
      public nombre: string,
      public descripcion: string,
    ) {}
}

export class SeccionAPI {
    constructor( 
      public nombre: string,
      public descripcion: string,
    ) {}
  }

export class RespuestaAPI {
    constructor( 
      public nombre: string,
      public valor: number,
      public orden: number,
      public instrumento?: string, // Es opcional y va al final
    ) {}
}

export class PreguntaApi {
    constructor( 
      public enunciado: string,
      public descripcion: string,
      public categoria: CategoriaAPI,
      public seccion: SeccionAPI,
      public orden: number,
      public tipoComponente: string,
      public respuestas: RespuestaAPI[]     
    ) {}
}

  