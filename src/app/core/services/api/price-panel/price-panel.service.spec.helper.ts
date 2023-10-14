
import { Observable } from 'rxjs';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';

export function obtenerTitulosMock(): Observable<Titulo[]> {
  const datos = [{
    simbolo: 'BTC',
    precio: 10000,
    variacion: 1.5,
  }];
  return new Observable((subscriber) => {
    subscriber.next(datos);
    subscriber.complete();
  });
}

export function capturarOrdenMock(sentido: string, simbolo: string, cantidad: number, mapa: Map<string, string>): Observable<any> {
  return new Observable((subscriber) => {
    subscriber.next({
      success: true,
    });
    subscriber.complete();
  });
}
