
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cartera } from 'src/app/core/models/valuacion-total-cartera/cartera';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValuacionTotalCarteraService {
  resp = `${environment.API}/cartera/valuacion/total`;
  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<Cartera> {
    return this.http.get<Cartera>(this.resp);
  }
}
