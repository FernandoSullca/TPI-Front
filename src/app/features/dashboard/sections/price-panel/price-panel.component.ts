import { Component, OnInit, signal } from '@angular/core';
import { PricePanelService } from 'src/app/core/services/api/price-panel/price-panel.service';
// import { CommonModule } from '@angular/common';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.scss']
})
export class PricePanelComponent implements OnInit {
  public titulos: Titulo[] = [];
  public titulosSimbolo: String[] = [];
  public titulosSimboloMapa = new Map<string, string>();
  public simbolo: string = '';
  public cantidad: number = 0;
  public textMessage: string = '';
  public typeMessage: string = '';


  constructor(private pricePanelService: PricePanelService) { }

  ngOnInit(): void {
    // const response = this.pricePanelService.obtenerTitulos();
    // console.log("🚀 ~ file: price-panel.component.ts:16 ~ PricePanelComponent ~ ngOnInit ~ response:", response)
    this.getTitulos();
  }

  public getTitulos() {
    return this.pricePanelService.obtenerTitulos()
      .then((titulos) => {
        this.titulos = titulos;
        this.titulosSimbolo = titulos.map((t) => t.simbolo || 'Desconocido')
        titulos.forEach((titulo) => {
          if (titulo.simbolo && titulo.categoriaInstrumento) {
            this.titulosSimboloMapa.set(titulo.simbolo, titulo.categoriaInstrumento);
          }
        });
      })
      .catch((error) => console.error(error))
  }

  public vender() {
    if (!this.validateData()) {
      this.textMessage = "Debes ingresar datos validos"
      this.typeMessage = "error"
      return false;
    }
    return this.pricePanelService.capturarOrden('venta', this.simbolo, this.cantidad, this.titulosSimboloMapa)
      .then(() => {
        this.textMessage = "Operacion realizada"
        this.typeMessage = "success"
      })
      .catch((error) => {
        this.textMessage = error.response.data;
        this.typeMessage = "error"
        console.error(error)
      })


  }
  public comprar() {
    if (!this.validateData()) {
      this.textMessage = "Debes ingresar datos validos"
      this.typeMessage = "error"
      return false;
    }

    return this.pricePanelService.capturarOrden('compra', this.simbolo, this.cantidad, this.titulosSimboloMapa)
      .then(() => {
        this.textMessage = "Operacion realizada"
        this.typeMessage = "success"
      })
      .catch((error) => {
        this.textMessage = error.response.data
        this.typeMessage = "error"
        console.error(error)
      })
  }

  public validateData() {
    return this.cantidad && this.simbolo
  }
}
