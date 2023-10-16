export interface Cartera{
   totalCartera?:number;
   totalInstrumentos?:number;
   totalMonedas?:number;
   cantidadPorInstrumento:CantidadPorInstrumento[];
   
}

export interface CantidadPorInstrumento{
   simbolo?:string;
   cantidad?:number;
}