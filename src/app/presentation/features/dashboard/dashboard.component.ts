import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DolarBolsa } from 'src/app/core/models/dolar-bolsa/dolar-bolsa';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';

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
  valorActualDolarMEP: DolarBolsa | undefined;
  fechaCompletaDolarMEP: string='';

  constructor(private router : Router,private localstorage:LocalStorageService,private carteraService : CarteraService) { }

  public ngOnInit(): void {
    this.obtenerPrecioDolarMEP();
  }
  public actionMenuMobile(): void {
    this.menuMobile = !this.menuMobile;
  }

  cerrarSesion() {
    this.localstorage.RemovePerfilActualLocal();
    this.localstorage.removeItem("perfil");
    this.localstorage.removeItem("horizonteTemporal"); 
    this.localstorage.removeItem("toleranciaRiesgo"); 
    this.router.navigate(["/"]);
  }
  obtenerPrecioDolarMEP(){
    return this.carteraService.getPrecioDolarMEP().subscribe((response)=>{
    this.valorActualDolarMEP=response;
    const fecha = (new Date(this.valorActualDolarMEP.fechaActualizacion)).toLocaleString();
    this.fechaCompletaDolarMEP = fecha;
    })
  }
}
