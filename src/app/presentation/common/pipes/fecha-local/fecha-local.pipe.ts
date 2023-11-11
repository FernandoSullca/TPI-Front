import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaLocal'
})
export class FechaLocalPipe implements PipeTransform {
  
  constructor(private datePipe: DatePipe) {}

  transform(value: Date): string {
    // Verificar si el valor es nulo antes de intentar formatearlo
    if (value === null) {
      return 'Fecha no disponible';
    }

    // Utilizar el operador de coalescencia nula (??) para proporcionar un valor predeterminado
    return this.datePipe.transform(value, 'dd/MM/yyyy') ?? 'Fecha no disponible';
  }

}
