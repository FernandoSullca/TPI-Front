import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porcentajeValorCustomizado'
})
export class PorcentajeValorCustomizadoPipe implements PipeTransform {

  transform(valor: number | string | undefined, tipo: 'porcentual' | 'monto'): string  {
    if (valor != undefined) {
      if (typeof valor === 'string')
        valor = parseFloat(valor);
      if (tipo === 'porcentual') {
        return this.formatearPorcentaje(valor);
      } else if (tipo === 'monto') {
        return this.formatearMonto(valor);
      }
      else{
        return 'Formato no reconocido';
      }
    }
    else {
      return 'Formato no reconocido';
    }
  }

  private formatearPorcentaje(valor: number): string {
    if (valor > 0) {
      return `+${this.formatearValor(valor)}%`;
    } else {
      return `${this.formatearValor(valor)}%`;
    }
  }

  private formatearMonto(valor: number): string {
    if (valor > 0) {
      return `+${this.formatearValor(valor)}`;
    } else {
      return `${this.formatearValor(valor)}`;
    }
  }

  private formatearValor(valor: number): string {
    return valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
