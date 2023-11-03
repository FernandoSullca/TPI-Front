import { Titulo } from "../price-panel/titulo.model"

export interface SolapaDetalleInstrumento{
    datosGraficoVelas : DatosGraficoVelas[]
    detalleInstrumento : Titulo
}
export interface DatosGraficoVelas{
    tiempo:string,
    precioDeApertura:string,
    maximo:string,
    minimo:string,
    precioDeCierre:string,
}