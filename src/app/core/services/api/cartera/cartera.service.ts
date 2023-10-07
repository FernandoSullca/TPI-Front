
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cartera } from 'src/app/core/models/cartera/cartera';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {
  resp = `${environment.API}/cartera/valuacion/total`;
  constructor(private http: HttpClient) {}

  getCartera(): Observable<Cartera> {
    return this.http.get(this.resp);
  }
}
