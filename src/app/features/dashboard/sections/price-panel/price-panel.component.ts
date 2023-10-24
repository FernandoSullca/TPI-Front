import { Component, OnInit, signal } from '@angular/core';
import { PricePanelService } from 'src/app/core/services/api/price-panel/price-panel.service';
// import { CommonModule } from '@angular/common';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
import { mockAcciones } from 'src/app/core/services/api/price-panel/mock'
import { environment } from 'environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { DatosGraficoVelas, DetalleInstrumento } from 'src/app/core/models/detalle-instrumento/detalle-instrumento';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.scss']
})
export class PricePanelComponent implements OnInit {
  public titulos: Titulo[] = [];
  public titulosSimboloMapa = new Map<string, string>();
  public simboloByCartera: string = '';
  public cantidad: number = 0;
  public textMessage: string = '';
  public typeMessage: string = '';
  public lastUpdatePanel: string = '';
  public instrumento : string=''
  public titulosSimbolo: string[] = []; 
  public simbolo: string = ''; 
  public filteredTitulos: string[] = [];
  public totalDineroDisponible:number=0;

  constructor(private pricePanelService: PricePanelService,private modalService : NgbModal,private carteraService : CarteraService) { }

  ngOnInit(): void {
    this.getDineroDisponible();
    this.getTitulos();
    this.updateTitulosEvery(environment.UPDATE_PRICE_PANEL_EVERY_SECONDS);
    this.titulosSimbolo = this.pricePanelService.getSimbolosEnMemoria();
  }

  public openModal(instrumento: string) {
    let detalleInstrumento = this.filtrarPorInstrumento(instrumento);
    if (detalleInstrumento) {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.detalleInstrumento = detalleInstrumento;
    } else {
      console.log('Instrumento no encontrado');
    }
  } 
  public filtrarPorInstrumento(instrumento:string){
    return this.titulos.find(titulo => titulo.simbolo === instrumento);
  }

  public getDineroDisponible(){
    return this.carteraService.getCartera().subscribe((response) => {
      if(response.totalMonedas)
        this.totalDineroDisponible=response.totalMonedas;
    })
  }
  onInputChange() {
    this.filteredTitulos = this.titulosSimbolo.filter(simbolo =>
      simbolo.toLowerCase().includes(this.simbolo.toLowerCase())
    );
  }

  selectSymbol(simbolo: string) {
    this.simbolo = simbolo;
    this.filteredTitulos = [];
  }

  public seleccionarInstrumento(instrumento: string) {
    this.simboloByCartera = instrumento;
    this.simbolo = instrumento;
  }

  public updateTitulosEvery(segundos: number) {
    if (segundos > 0) {
      setInterval(() => {
        console.log("🚀 ~ file: price-panel.component.ts:52 ~ PricePanelComponent ~ updateTitulosEvery ~ this.titulos:", this.titulos)
        return this.getTitulos()
      }, segundos * 1000)
    }
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
      .catch((error) => {
        const mockSerializado = mockAcciones.map(m => Titulo.serializar(m));
        this.titulos = mockSerializado;
        this.titulosSimbolo = mockSerializado.map((t) => t.simbolo || 'Desconocido')
        mockSerializado.forEach((titulo) => {
          if (titulo.simbolo && titulo.categoriaInstrumento) {
            this.titulosSimboloMapa.set(titulo.simbolo, titulo.categoriaInstrumento);
          }
        });
        console.error(error)
      })
      .finally(() => {
        this.lastUpdatePanel = new Date().toLocaleDateString('es-es', { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }) + " hs."
      });
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
        this.getDineroDisponible();
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
