import { Component, Input, OnInit } from '@angular/core';
import { DatosGraficoVelas, SolapaDetalleInstrumento } from '../../../../core/models/detalle-instrumento/detalle-instrumento';
import { DetalleInstrumentoService } from '../../../../core/services/api/detalle-instrumento/detalle-instrumento.service';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';
import { driver } from "driver.js";

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() detalleInstrumento!: Titulo;
  @Input() tipoModal: string | undefined;
  textMessage: string = '';
  typeMessage: string = '';
  instrumento: string = '';
  solapaDetalleInstrumento!: SolapaDetalleInstrumento;
  datosGraficoVelas!: DatosGraficoVelas[];
  constructor(private detalleInstrumentoService: DetalleInstrumentoService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.seleccionarInstrumento();
    this.mostrarVariacionDiaria();
  }
  public seleccionarInstrumento() {
    const simbolo = this.detalleInstrumento?.simbolo;
    this.detalleInstrumentoService.getDetalleInstrumento(simbolo).subscribe((response) => {
      this.datosGraficoVelas = response;
      this.solapaDetalleInstrumento = {
        detalleInstrumento: this.detalleInstrumento,
        datosGraficoVelas: response,
      };
    });
  }
  public mostrarVariacionDiaria() {
    if (this.detalleInstrumento?.variacionPorcentual) {
      const variacion = this.detalleInstrumento.variacionPorcentual;
      const ultimoCierre = this.detalleInstrumento.ultimoCierre;
      if (ultimoCierre != undefined) {
        const valorFinal = ((ultimoCierre * variacion) / 100).toFixed(2);
        const textoPorcentual = `(${variacion.toFixed(2)}%)`;
        this.textMessage = '$' + valorFinal.toString().concat(textoPorcentual);
        if (this.detalleInstrumento.variacionPorcentual > 0)
          this.typeMessage = 'success';
        else
          this.typeMessage = 'error';
      }
    }
  }
  public cerrarModal() {
    this.modalService.closeModal();
  }

  public ayuda() {
    const htmlString = `
    <div style="display: flex">
    <img src="/assets/image/vela-ayuda.png"> 
    <div style="display: flex; flex-direction: column; padding-top: 0.5rem; justify-content: space-evenly;">
      <span>Maximo</span>
      <span>Cierre</span>
      <span>Apertura</span>
      <span>Minimo</span>
    </div>
    </div>
    `;
    const driverObj = driver({
      showProgress: false,
      steps: [
        {
          popover: {
            title: 'Lectura de vela',
            description: htmlString,
          }
        }
      ],
      showButtons :["close"]
    });

    driverObj.drive();
  }
}
