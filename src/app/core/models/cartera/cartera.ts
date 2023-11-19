export interface Cartera{
   totalCartera?:number;
   totalInstrumentos?:number;
   totalMonedas?:number;
   procentajeGananciaPerdida:string;
   cantidadPorInstrumento:CantidadPorInstrumento[];
}

export interface CantidadPorInstrumento{
   simbolo?:string;
   cantidad?:number;
}