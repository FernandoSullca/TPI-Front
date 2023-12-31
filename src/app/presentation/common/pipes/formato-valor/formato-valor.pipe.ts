import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoValor'
})
export class FormatoValorPipe implements PipeTransform {

  transform(value: number | undefined|string): string {
    let valorNumericoDeString : number=0;
    if(typeof value ==='string'){
      valorNumericoDeString = parseFloat(value);
      value=valorNumericoDeString;
    }
    if (value === undefined || isNaN(value)) {
      return '-';
    }

    const options = {
      style: 'currency',
      currency: 'ARS', 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    };

    return value.toLocaleString('es-AR', options); 
  }
}
