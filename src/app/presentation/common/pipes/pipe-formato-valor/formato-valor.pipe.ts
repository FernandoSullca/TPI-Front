import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoValor'
})
export class FormatoValorPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value === undefined || isNaN(value)) {
      return '-'; // o algún valor predeterminado si lo deseas
    }

    // Formatear el número con dos decimales y el símbolo de moneda peso argentino (ARS)
    const options = {
      style: 'currency',
      currency: 'ARS', // Símbolo de moneda peso argentino (ARS)
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    };

    return value && value.toLocaleString('es-AR', options) || ''; // 'es-AR' para el español de Argentina
  }
}
