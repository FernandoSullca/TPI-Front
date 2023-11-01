export interface PortfolioSugerido {
    simbolo: string;
    categoriaInstrumento: string;
    categoriaPerfil: string;
    ultimoPrecio: number;
    variacionPorcentual: number;
    apertura: number;
    maximo: number;
    minimo: number;
    ultimoCierre: number;
    volumen: number;
    cantidadOperaciones: number;
    fecha: string;
    mercado: string;
    moneda: string;
    descripcion: string;
    plazo: string;
    laminaMinima: number;
    lote: number;
    flashCompra: number;
    flashVenta: number;
    oid: number;
    version: number;
    deleted: boolean;
  }