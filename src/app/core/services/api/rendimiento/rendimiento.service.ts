import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { Observable, catchError } from 'rxjs';
import { HistoricoInstrumento, RendimientoTotalInstrumento } from 'src/app/core/models/rendimiento/rendimiento';

@Injectable({
  providedIn: 'root'
})
export class RendimientoService {
  public rendimientoInstrumento!: RendimientoTotalInstrumento[];
  public historicoInstrumento!: HistoricoInstrumento[];
  resp = `${environment.API}/loQueSigue`;
  constructor(private http: HttpClient,private handleErrorService : HandleErrorApiService ) {}

  getRendimiento(): Observable<any>{
    return this.http.get<any>(this.resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
  obtenerRendimientoTotal() {
    this.rendimientoInstrumento = [
      {
        simbolo: 'AAPL',
        cantidad: 10,
        ultimoPrecio: 160,
        precioInicialDeCompra: 150,
        totalPorcentajeGeneral: 6.67,
        totalGananaciaPerdidaPesos: 100,
        totalValorizadoPesos: 1600
      },
      {
        simbolo: 'GOOGL',
        cantidad: 5,
        ultimoPrecio: 3000,
        precioInicialDeCompra: 2800,
        totalPorcentajeGeneral: 7.14,
        totalGananaciaPerdidaPesos: 1000,
        totalValorizadoPesos: 15000
      },
      {
        simbolo: 'MSFT',
        cantidad: 8,
        ultimoPrecio: 320,
        precioInicialDeCompra: 300,
        totalPorcentajeGeneral: 6.67,
        totalGananaciaPerdidaPesos: 160,
        totalValorizadoPesos: 2560
      }
    ];
    return this.rendimientoInstrumento;

  }
  obtenerHistoricoInstrumento(simbolo: string) {
    this.historicoInstrumento = [
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-08'),
        porcentajeRendimiento: 1.5,
        gananciaPerdidaDiaria: 15,
        totalValorizadoDiario: 1600
      },
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-09'),
        porcentajeRendimiento: -0.8,
        gananciaPerdidaDiaria: -8,
        totalValorizadoDiario: 1585
      },
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-10'),
        porcentajeRendimiento: 2.3,
        gananciaPerdidaDiaria: 23,
        totalValorizadoDiario: 1620
      }
    ];
    return this.historicoInstrumento;
  }
}
