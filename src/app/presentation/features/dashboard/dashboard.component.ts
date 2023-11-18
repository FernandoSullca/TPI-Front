import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DolarBolsa } from 'src/app/core/models/dolar-bolsa/dolar-bolsa';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { PortfolioSugeridoService } from 'src/app/core/services/api/portfolio-sugerido/portfolio-sugerido.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public menuMobile = false;
  public tokenRole = localStorage.getItem('role');
  public enabledPerfil = false;
  public enabledAdminMode = false;
  public quantityNotifications = 0;
  public valorActualDolarMEP: DolarBolsa | undefined;
  public fechaCompletaDolarMEP: string = '';
  public portfolioSugerido!: PortfolioSugerido[];
  public tipoPerfil: string | undefined

  constructor(private router: Router, private localstorage: LocalStorageService,
    private carteraService: CarteraService, public modalService: ModalService,
    private portfolioSugeridoService: PortfolioSugeridoService) { }

  public ngOnInit(): void {
    this.obtenerPortfolioSugerido(this.obtenerTipoPerfil());
    this.obtenerPrecioDolarMEP();
  }
  public actionMenuMobile(): void {
    this.menuMobile = !this.menuMobile;
  }

  cerrarSesion() {
    this.localstorage.removeAllItems();
    this.router.navigate(["/"]);
  }
  obtenerPrecioDolarMEP() {
    return this.carteraService.getPrecioDolarMEP().subscribe((response) => {
      this.valorActualDolarMEP = response;
      const fecha = (new Date(this.valorActualDolarMEP.fechaActualizacion)).toLocaleString();
      this.fechaCompletaDolarMEP = fecha;
    })
  }
  openModal() {
    this.modalService.openModal();
  }
  public obtenerPortfolioSugerido(tipoPerfil: string | undefined) {
    this.portfolioSugeridoService.getPortfolioSugerido(tipoPerfil).subscribe((response) => {
      this.portfolioSugerido = response;
    });
  }
  public obtenerTipoPerfil() {
    const regex = /\"/ig;
    return localStorage.getItem('perfilObjetivoCartera')?.replace(regex, "") || this.tipoPerfil || '';
  }
}
