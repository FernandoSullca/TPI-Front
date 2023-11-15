import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porcentajeValorCustomizado'
})
export class PorcentajeValorCustomizadoPipe implements PipeTransform {

  transform(valor: number, tipo: 'porcentual' | 'monto'): string {
    if (tipo === 'porcentual') {
      return this.formatearPorcentaje(valor);
    } else if (tipo === 'monto') {
      return this.formatearMonto(valor);
    } else {
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
    // Formato de moneda argentina
    return valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
