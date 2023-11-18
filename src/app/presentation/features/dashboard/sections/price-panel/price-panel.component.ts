import { Component, OnDestroy, OnInit } from '@angular/core';
import { PricePanelService } from 'src/app/core/services/api/price-panel/price-panel.service';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
import { mockAcciones } from 'src/app/core/services/api/price-panel/mock'
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { driver } from "driver.js";

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.scss']
})
export class PricePanelComponent implements OnInit,OnDestroy {
  public titulos: Titulo[] = [];
  public titulosSimboloObjeto: any = {};
  public simboloByCartera: string = '';
  public cantidad: number = 0;
  public textMessage: string = '';
  public typeMessage: string = '';
  public lastUpdatePanel: string = '';
  public instrumento: string = ''
  public titulosSimbolo: any[] = [];
  public simbolo: string = '';
  public filteredTitulos: any[] = [];
  public totalDineroDisponible: number = 0;
  public detalleInstrumento!: Titulo;
  public tipoModal: string | undefined;
  public instrumentoSeleccionadoSubject!: Subscription;
  public loadingButton = false;
  public panel: string = 'acciones';
  public loading = false;

  constructor(private pricePanelService: PricePanelService, public modalService: ModalService, private carteraService: CarteraService) {

  }
  ngOnDestroy(): void {
    if (this.instrumentoSeleccionadoSubject) {
      this.instrumentoSeleccionadoSubject.unsubscribe();
      this.pricePanelService.setearSimboloDePortafolioSugerido('', '');
    }
  }
  ngOnInit(): void {
    this.generarSubjectASimbolo();
    this.getDineroDisponible();
    this.getTitulos(this.panel);
    this.updateTitulosEvery(environment.UPDATE_PRICE_PANEL_EVERY_SECONDS);
    this.ayuda();
  }

  public async seleccionarPanel(panel: string) {
    if (!this.loading) {
      await this.getTitulos(panel);
      this.panel = panel;
    }
  }
  public generarSubjectASimbolo() {
    this.instrumentoSeleccionadoSubject = this.pricePanelService.obtenerSimboloDePortafolioSugerido().subscribe({
      next: instrumentoSeleccionado => {
        this.simbolo = instrumentoSeleccionado.split(",")[0];
        this.titulosSimboloObjeto.instrumento = instrumentoSeleccionado.split(",")[1];
      },
      error: error => {
        return error;
      }
    })
  }
  public openModal(instrumento: string) {
    const detalleInstrumento = this.filtrarPorInstrumento(instrumento);
    if (detalleInstrumento) {
      this.detalleInstrumento = detalleInstrumento;
      this.modalService.openModal();
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
    this.filteredTitulos = this.titulosSimbolo.filter(titulo =>
      titulo.simbolo.toLowerCase().includes(this.simbolo.toLowerCase())
    );
  }

  selectSymbol(simbolo: string, instrumento: string) {
    this.simbolo = simbolo;
    this.titulosSimboloObjeto = { simbolo, instrumento };
    this.filteredTitulos = [];
  }

  public seleccionarInstrumento(instrumento: string, tipoInstrumento: string) {
    this.simboloByCartera = instrumento;
    this.simbolo = instrumento;
    this.titulosSimboloObjeto.instrumento = tipoInstrumento;
  }

  public updateTitulosEvery(segundos: number):any {
    if (segundos > 0) {
      setInterval(() => {
        return this.getTitulos(this.panel)
      }, segundos * 1000)
    }
  }

  public async getTitulos(panel: string) {
    this.textMessage = '';
    this.typeMessage = '';
    try {
      try {
        this.loading = true;
        const titulos = await this.pricePanelService.obtenerTitulos(panel);
        this.titulos = titulos;
        this.titulosSimbolo = titulos.map((t) => { return { simbolo: t.simbolo || 'Desconocido', instrumento: t.categoriaInstrumento || 'Desconocido' } });
        this.loading = false;
      } catch (error) {
        const mockSerializado = mockAcciones.map(m => Titulo.serializar(m));
        this.titulos = mockSerializado;
        this.titulosSimbolo = mockSerializado.map((t) => { return { simbolo: t.simbolo || 'Desconocido', instrumento: t.categoriaInstrumento || 'Desconocido' } });
        this.loading = false;
        console.error(error);
      }
    } finally {
      this.lastUpdatePanel = new Date().toLocaleDateString('es-es', { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }) + " hs.";
      this.loading = false;
    }
  }

  public vender() {
    if (!this.validateData()) {
      this.textMessage = "Debes ingresar datos validos"
      this.typeMessage = "error"
      return false;
    }
    this.loadingButton = true;
    return this.pricePanelService.capturarOrden('venta', this.simbolo, this.cantidad, this.titulosSimboloObjeto)
      .then(() => {
        this.loadingButton = false;
        this.textMessage = "Operacion realizada"
        this.typeMessage = "success"
        this.getDineroDisponible();
      })
      .catch((error) => {
        this.loadingButton = false;
        const mesaggeError = error.response.data.message.includes("Ocurrió un error en el servicio");
        const index = error.response.data.message.indexOf("Puede operar");
        const subString = error.response.data.message.substring(index);

        if (mesaggeError) {
          this.textMessage = subString;
        } else {
          this.textMessage = error.response.data.message;
        }
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
    return this.pricePanelService.capturarOrden('compra', this.simbolo, this.cantidad, this.titulosSimboloObjeto)
      .then(() => {
        this.loadingButton = false;
        this.textMessage = "Operacion realizada"
        this.typeMessage = "success"
        this.getDineroDisponible();
      })
      .catch((error) => {
        this.loadingButton = false;
        const mesaggeError = error.response.data.message.includes("Ocurrió un error en el servicio");
        const index = error.response.data.message.indexOf("Puede operar");
        const subString = error.response.data.message.substring(index);

        if (mesaggeError) {
          this.textMessage = subString;
        } else {
          this.textMessage = error.response.data.message;
        }
        this.typeMessage = "error"
        console.error(error)
      })
  }

  public validateData() {
    return this.cantidad && this.simbolo
  }

  public ayuda() {
    if (!this.loading) {

      const htmlString = `
    <div style="display: flex; flex-direction: column;">
    <div>
      <i class="fa-solid fa-chart-line mx-1" title="Ver grafico"></i>
      Aca podras ver a detalle el grafico instrumento.
    </div>
    <div>
      <i class="fa-solid fa-money-bill-transfer" title="Operar"></i>
      Aca podras seleccionar el instrumento para operarlo.
    </div>
    </div>
    `;
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: '#seleccion',
            popover: {
              title: 'Seleccion de panel',
              description: 'Aca podras seleccionar si quieres ver Acciones Bonos o Cedears',
              side: "left",
              align: 'start'
            }
          },
          { element: '#atajos', popover: { title: 'Atajos utiles', description: htmlString, side: "left", align: 'start' } },
          { element: '#dineroDisponible', popover: { title: 'Tu dinero', description: 'Aca podras observar tu dinero disponible', side: "left", align: 'start' } },
          { popover: { title: 'Ahora podes aprender a invertir', description: 'compra distintos instrumentos y mira como va el rendimiento en el paso del tiempo.' } }
        ],
        nextBtnText: 'Siguiente',
        prevBtnText: 'Atras',
        doneBtnText: 'Finalizar'
      });

      driverObj.drive();
    }
  }
}
