import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
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
  loading = false;
  constructor(
    private registroUsuarioService: RegistroService,
    private LocalStorageService: LocalStorageService,
    private perfilesServicios: PerfilInversorService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  public loguearme() {
    console.log("🚀 ~ file: login.component.ts:49 ~ LoginComponent ~ loguearme ~ loguearme:")

    this.errorform = false;
    this.errorLogin = false;

    if (!this.validarEntradas()) {
      this.errorform = true;
      console.log("Error de campos enviados");
      return
    }

    this.verfificarUsuario();

  }

  public verfificarUsuario() {
    this.loading = true;

    this.registroUsuarioService.buscarUsuario(this.usuarioForm.email).subscribe(
      (usuarioRecibido: UsuarioAPI) => {
        this.usuariodb = usuarioRecibido;

        this.buscarPerfilUsuario(this.usuariodb).subscribe(
          (perfilUsuario: PerfilInversorAPI | null) => {
            if (perfilUsuario === null || perfilUsuario === undefined) {
              this.loading = false;
              //Al loguearse se guarda el usuario mas el perfil(Nulo)
              this.LocalStorageService.setUsuarioPerfilActualLocal(this.usuariodb);
              this.LocalStorageService.SetPerfilActualLocal();
              this.navegarAPerfil();
            } else {
              this.loading = false;
              //Al loguearse se guarda el usuario mas el perfil
              this.LocalStorageService.setPerfilSubjetivo(perfilUsuario);
              this.LocalStorageService.SetPerfilActualLocal();
              this.navegarAHome();
            }
          }
        );
      },
      (error) => {
        this.loading = false;
        this.errorform = false;
        this.errorLogin = true;
        console.log("🚀 ~ file: login.component.ts:82 ~ LoginComponent ~ verfificarUsuario ~ errorLogin:", this.errorLogin)
        console.error("Error al buscar Usuario", error);
      });
  }

  buscarPerfilUsuario(usuariodb: UsuarioAPI): Observable<PerfilInversorAPI | null> {

    return this.perfilesServicios.obtenerPerfil(usuariodb)

  }

  validarEntradas() {
    if (!this.usuarioForm.email || !this.usuarioForm.password) {
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