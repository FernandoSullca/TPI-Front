import { Component, OnInit, signal } from '@angular/core';
// import { PricePanelService } from 'src/app/core/services/api/otro-panel/otro-panel.service';
import { CommonModule } from '@angular/common';
// import { Titulo } from 'src/app/core/models/otro-panel/titulo.model';

@Component({
  selector: 'app-otro',
  templateUrl: './otro.component.html',
  styleUrls: ['./otro.component.scss']
})
export class OtroComponent implements OnInit {
  // public titulos: Titulo[] = [];
//   titulos = signal([]);
  /* lista = [1, 2, 3, 4];
  public algo = 'algo';
  objects: object[] = [
    { name: 'Juan', age: 25 },
    { name: 'Pedro', age: 30 },
    { name: 'María', age: 20 }
  ]; */
  constructor(/* private otroPanelService: PricePanelService */) { }

  ngOnInit(): void {
    // const response = this.otroPanelService.obtenerTitulos();
    // console.log("🚀 ~ file: otro-panel.component.ts:16 ~ PricePanelComponent ~ ngOnInit ~ response:", response)
    // this.getTitulos();
  }

  /* public getTitulos() {
    return this.otroPanelService.obtenerTitulos()
      .then((titulos) => {
        console.log("🚀 ~ file: otro-panel.component.ts:32 ~ PricePanelComponent ~ .then ~ titulos:", titulos)
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
