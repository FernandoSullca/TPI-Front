export class Titulo {
    constructor(
        public simbolo?: string,
        public categoriaInstrumento?: string,
        public puntas?: {
            cantidadCompra: number;
            precioCompra: number;
            precioVenta: number;
            cantidadVenta: number;
        },
        public ultimoPrecio?: number,
        public variacionPorcentual?: number,
        public apertura?: number,
        public maximo?: number,
        public minimo?: number,
        public ultimoCierre?: number,
        public volumen?: number,
        public cantidadOperaciones?: number,
        public fecha?: string,
        public tipoOpcion?: string | null,
        public precioEjercicio?: number | null,
        public fechaVencimiento?: string | null,
        public mercado?: string,
        public moneda?: string,
        public descripcion?: string,
        public plazo?: string,
        public laminaMinima?: number,
        public lote?: number,
        public flashCompra?: number,
        public flashVenta?: number
    ) {}

    // Método para serializar el objeto JSON recibido desde la API
    public static serializar(json: any): Titulo {
        return new this(
            json.simbolo,
            json.categoriaInstrumento,
            json.puntas,
            json.ultimoPrecio,
            json.variacionPorcentual,
            json.apertura,
            json.maximo,
            json.minimo,
            json.ultimoCierre,
            json.volumen,
            json.cantidadOperaciones,
            json.fecha,
            json.tipoOpcion,
            json.precioEjercicio,
            json.fechaVencimiento,
            json.mercado,
            json.moneda,
            json.descripcion,
            json.plazo,
            json.laminaMinima,
            json.lote,
            json.flashCompra || 0,
            json.flashVenta || 0
        );
    }
}