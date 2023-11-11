export interface RendimientoTotalInstrumento{
    simbolo:string,
    cantidad: number,
    ultimoPrecio: number,
    precioInicialDeCompra:number,
    totalPorcentajeGeneral:number,
    totalGananaciaPerdidaPesos:number,
    totalValorizadoPesos:number
}
export interface HistoricoInstrumento{
    simbolo:string
    cantidad: number,
    fecha:Date,
    porcentajeRendimiento: number,
    gananciaPerdidaDiaria: number,
    totalValorizadoDiario:number
}