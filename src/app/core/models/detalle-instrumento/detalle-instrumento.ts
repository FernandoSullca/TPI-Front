export interface SolapaDetalleInstrumento{
    detalleGraficoVelas : DatosGraficoVelas[]
    detalleInstrumento : DetalleInstrumento
}
export interface DatosGraficoVelas{
    simbolo:string,
    precionDeApertura:string,
    maximo:string,
    minimo:string,
    precioDeCierre:string,
}
export interface DetalleInstrumento {
    simbolo: string;
    categoriaInstrumento: string;
    puntas: {
      cantidadCompra: number;
      precioCompra: number;
      cantidadVenta: number;
      precioVenta: number;
      deleted: boolean;
    };
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
    deleted: boolean;
  }