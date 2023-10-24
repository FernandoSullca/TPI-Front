import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoValor'
})
export class FormatoValorPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value === undefined) {
      return ''; // o algún valor predeterminado si lo deseas
    }

    // Formatear el número con dos decimales y coma como separador decimal
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    };

    return value.toLocaleString('es-ES', options);
  }
}
