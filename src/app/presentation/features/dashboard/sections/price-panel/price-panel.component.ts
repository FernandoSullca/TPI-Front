import { Component, OnDestroy, OnInit } from '@angular/core';
import { PricePanelService } from 'src/app/core/services/api/price-panel/price-panel.service';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
import { mockAcciones } from 'src/app/core/services/api/price-panel/mock'
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';

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
  public instrumento: string = ''
  public titulosSimbolo: string[] = [];
  public simbolo: string = '';
  public filteredTitulos: string[] = [];
  public totalDineroDisponible: number = 0;
  public detalleInstrumento!: Titulo;
  public tipoModal: string | undefined;
  public instrumentoSeleccionadoSubject!: Subscription;
  public loadingButton = false;
  public panel: string = 'acciones';

  constructor(private pricePanelService: PricePanelService, public modalService: ModalService, private carteraService: CarteraService) {

  }
  ngOnDestroy(): void {
    if (this.instrumentoSeleccionadoSubject) {
      this.instrumentoSeleccionadoSubject.unsubscribe();
      this.pricePanelService.setearSimboloDePortafolioSugerido('');
    }
  }
  ngOnInit(): void {
    this.generarSubjectASimbolo();
    this.getDineroDisponible();
    this.getTitulos();
    this.updateTitulosEvery(environment.UPDATE_PRICE_PANEL_EVERY_SECONDS);
    this.titulosSimbolo = this.pricePanelService.getSimbolosEnMemoria();
  }

  public seleccionarPanel(panel: string) {
    this.titulos = [];
    this.panel = panel;
    this.getTitulos();
  }
  public generarSubjectASimbolo() {
    this.instrumentoSeleccionadoSubject = this.pricePanelService.obtenerSimboloDePortafolioSugerido().subscribe({
      next: instrumentoSeleccionado => {
        this.simbolo = instrumentoSeleccionado;
      },
      error: error => {
        this.simbolo = ''
        console.log("Error al recuperar datos");
      }
    })
  }
  public openModal(instrumento: string) {
    const detalleInstrumento = this.filtrarPorInstrumento(instrumento);
    if (detalleInstrumento) {
      this.detalleInstrumento = detalleInstrumento;
      this.modalService.openModal();
    } else {
      console.log('Instrumento no encontrado');
    }
  }
  openModalService() {
    this.modalService.openModal();
  }
  public filtrarPorInstrumento(instrumento: string) {
    return this.titulos.find(titulo => titulo.simbolo === instrumento);
  }

  public getDineroDisponible() {
    return this.carteraService.getCartera().subscribe((response) => {
      if (response.totalMonedas) {
        const totalMonedas = Number(response.totalMonedas);
        this.totalDineroDisponible = totalMonedas
      }
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
    return this.pricePanelService.obtenerTitulos(this.panel)
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

    this.loadingButton = true;

    return this.pricePanelService.capturarOrden('venta', this.simbolo, this.cantidad, this.titulosSimboloMapa)
      .then(() => {
        this.loadingButton = false;

        this.textMessage = "Operacion realizada"
        this.typeMessage = "success"
      })
      .catch((error) => {
        this.loadingButton = false;
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

    this.loadingButton = true;

    return this.pricePanelService.capturarOrden('compra', this.simbolo, this.cantidad, this.titulosSimboloMapa)
      .then(() => {
        this.loadingButton = false;
        this.textMessage = "Operacion realizada"
        this.typeMessage = "success"
        this.getDineroDisponible();
      })
      .catch((error) => {
        this.loadingButton = false;
        this.textMessage = error.response.data
        this.typeMessage = "error"
        console.error(error)
      })
  }

  public validateData() {
    return this.cantidad && this.simbolo
  }
}
