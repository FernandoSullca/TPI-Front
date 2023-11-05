import { UsuarioAPI } from "./Usuario-API.model";

export class PerfilInversorAPI {

    constructor(

        public oid: number,
        public deleted: number,
        public version: number,

        public horizonteTemporal: number,

        public toleranciaRiesgo: number,

        public tipoPerfilSubjetivo: string,
   
        public nivelConocimiento: number,

        public tipoNivelConocimiento: string,

        public resultadoPerfilado: string,

        public perfilInversor: string,

        public UsuarioDTO: UsuarioAPI,
    ) { }
}