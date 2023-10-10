import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router : Router) { }

  public ngOnInit(): void {
  }
  public actionMenuMobile(): void {
    this.menuMobile = !this.menuMobile;
  }

  cerrarSesion() {
    this.router.navigate(["/"]);
  }
}
