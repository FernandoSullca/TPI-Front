import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';

@Injectable({
    providedIn: 'root'
})
export class PricePanelService {

    constructor(
        private http: HttpClient) { }

        /* getHeroes(): Observable<Hero[]> {
            const heroes = of(HEROES);
            this.messageService.add('HeroService: fetched heroes');
            return heroes;
          } */
    public obtenerTitulos() {
        
        
        // return this.http.get(`${environment.API}/algo`).subscribe((data: any) => {
        //     console.log("🚀 ~ file: price-panel.service.ts:15 ~ PricePanelService ~ returnthis.http.get ~ data.titulos:", data.titulos)
        //     return data.titulos;
        // });

         return axios.get(`${environment.API}/algo`);/* 
             .catch(function (error) {
                 // handle error
                 console.log(error);
             })
             .finally(function () {
                 // always executed
             });
 */    }
    /* public obtenerPedidos() : Promise<Array<Pedido>>{
      return this.http.get(environment.API+'/obtenerPedidos', {
      }).
      .then((data: any) => {
        const datos = Array.from(data);
        return datos.map((pedido) => {
          return Pedido.serializarPedido(pedido);
        });
      });
    } */




}
