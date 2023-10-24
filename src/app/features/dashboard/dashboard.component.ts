import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
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

  constructor(private router : Router,private localstorage:LocalStorageService) { }

  public ngOnInit(): void {
  }
  public actionMenuMobile(): void {
    this.menuMobile = !this.menuMobile;
  }

  cerrarSesion() {
    this.localstorage.RemovePerfilActualLocal();
    this.router.navigate(["/"]);
  }
}
