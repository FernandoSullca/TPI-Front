import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaLocal'
})
export class FechaLocalPipe implements PipeTransform {
  
  constructor(private datePipe: DatePipe) {}

  transform(value: Date): string {
    if (value === null) {
      return 'Fecha no disponible';
    }
    return this.datePipe.transform(value, 'dd/MM/yyyy') ?? 'Fecha no disponible';
  }

}
