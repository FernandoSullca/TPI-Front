import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';
import { PerfilInversorService } from 'src/app/core/services/api/perfil-inversor/perfil-inversor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorLogin: boolean = false;
  errorform: boolean = false;
  usuarioForm: any = {
    email: '',
    password: ''
  };

  usuariodb: UsuarioAPI = {
    oid: 0,
    version: 0,
    nombreUsuario: "",
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    pass: "",
    cuentaConfirmada: false,
    activo: false
  }

  constructor(
    private registroUsuarioService: RegistroService,
    private LocalStorageService: LocalStorageService,
    private perfilesServicios: PerfilInversorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
  }

  public verificarUsuario() {

    console.log("🚀 ~ file: login.component.ts:46 ~ LoginComponent ~ verificarUsuario ~ verificarUsuario:")

    this.errorLogin = false;
    if(!this.validarEntradas()){
      this.errorform = true;
      console.log("Error de campos enviados");
      return
    }

    this.registroUsuarioService.buscarUsuario(this.usuarioForm.email).subscribe(
      (usuarioRecibido: UsuarioAPI) => {
        this.usuariodb = usuarioRecibido;
        this.errorform = false;
        this.errorLogin = false;
        this.buscarPerfilUsuario(this.usuariodb).subscribe(
          (perfilUsuario: PerfilInversorAPI | null) => {
            if (perfilUsuario === null || perfilUsuario === undefined) {
              this.LocalStorageService.setUsuarioPerfilActualLocal(this.usuariodb);
              this.LocalStorageService.SetPerfilActualLocal();
              this.navegarAPerfil();
            } else {
              this.LocalStorageService.setPerfilSubjetivo(perfilUsuario);
              this.LocalStorageService.SetPerfilActualLocal();
              this.navegarAHome();
            }
          },
          (error) => {
            this.errorLogin = true;
            console.error("Error al buscar el perfil", error);
          }
        );
      });


  }

  buscarPerfilUsuario(usuariodb: UsuarioAPI): Observable<PerfilInversorAPI> {

    return this.perfilesServicios.obtenerPerfil(usuariodb)

  }

  validarEntradas(){
    if(!this.usuarioForm.email||!this.usuarioForm.password)
    {
      return false;
    }
    return true;
  }
  navegarAPerfil() {
    this.router.navigate(['/perfil']);
  }

  navegarAHome() {
    this.router.navigate(['dashboard/cartera']);
  }

}