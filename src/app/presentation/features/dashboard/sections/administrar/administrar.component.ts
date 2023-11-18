import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.scss']
})
export class AdministrarComponent  implements OnInit {
  constructor(private LocalStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
  this.verificarAdministracion();
  }

  verificarAdministracion(){
    let token = this.LocalStorageService.getItem("token");
    if (!token) {
      this.loadHome();
      return;
    }
    const tokenDecoded: any = { ...jwtDecode(token) };
    if (!tokenDecoded.esAdministrador) {
      this.loadHome();
      return;
    }
  }

  loadHome() {
    this.router.navigate(['/login']);
  }
  
}
