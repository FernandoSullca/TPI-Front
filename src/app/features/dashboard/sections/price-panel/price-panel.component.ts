import { Component, OnInit, signal } from '@angular/core';
// import { PricePanelService } from 'src/app/core/services/api/price-panel/price-panel.service';
import { CommonModule } from '@angular/common';
// import { Titulo } from 'src/app/core/models/price-panel/titulo.model';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.scss']
})
export class PricePanelComponent implements OnInit {
  // public titulos: Titulo[] = [];
//   titulos = signal([]);
  /* lista = [1, 2, 3, 4];
  public algo = 'algo';
  objects: object[] = [
    { name: 'Juan', age: 25 },
    { name: 'Pedro', age: 30 },
    { name: 'María', age: 20 }
  ]; */
  constructor(/* private pricePanelService: PricePanelService */) { }

  ngOnInit(): void {
    // const response = this.pricePanelService.obtenerTitulos();
    // console.log("🚀 ~ file: price-panel.component.ts:16 ~ PricePanelComponent ~ ngOnInit ~ response:", response)
    // this.getTitulos();
  }

  /* public getTitulos() {
    return this.pricePanelService.obtenerTitulos()
      .then((titulos) => {
        console.log("🚀 ~ file: price-panel.component.ts:32 ~ PricePanelComponent ~ .then ~ titulos:", titulos)
        this.titulos = titulos;
        
        // this.titulos.set(titulos);
      })
      .catch((error) => console.error(error))
  } */
/* 
  public prueba() {
    console.log(this.titulos)
  } */

}
