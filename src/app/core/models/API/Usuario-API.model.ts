export class UsuarioAPI {
    constructor(

        public oid: number,

        public nombreUsuario: string,

        public nombre: string,

        public apellido: string,

        public email: string,

        public pass: string,

        public cuentaConfirmada: boolean,

        public activo: boolean
    ) { }
}