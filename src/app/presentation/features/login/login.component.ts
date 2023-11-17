import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Observable } from 'rxjs';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';
import { PerfilInversorService } from 'src/app/core/services/api/perfil-inversor/perfil-inversor.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  opcion = 'login';
  errorLogin: boolean = false;
  errorform: boolean = false;
  errorRecuperar = false;
  successRecuperar = false;
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

  public opcionRecuperar() {
    this.opcion = 'recuperar';
  }
  public recuperarCuenta() {
    this.loading = true;

    this.registroUsuarioService.RecuperarCuenta(this.usuarioForm.email).subscribe(
      (data) => {
        this.loading = false;
        this.errorRecuperar = false;
        this.successRecuperar = true;
      },
      (error) => {
        this.loading = false;
        this.errorRecuperar = true;
      });

  }
  public loguearme() {

    this.errorform = false;
    this.errorLogin = false;

    if (!this.validarEntradas()) {
      this.errorform = true;
      console.log("Error de campos enviados");
      return
    }

    this.loginUsuario();

  }

  public loginUsuario() {
    this.loading = true;

    this.registroUsuarioService.loginUsuario(this.usuarioForm.email, this.usuarioForm.password).subscribe(
      (data) => {
        this.LocalStorageService.setItem("token", data.token);
        const tokenDecoded: any = { ...jwtDecode(data.token) };
        if (tokenDecoded.esAdministrador) {
          this.loginAdministrador();
          return
        }

        this.registroUsuarioService.buscarUsuario(this.usuarioForm.email).subscribe(
          (usuarioRecibido: UsuarioAPI) => {
            this.LocalStorageService.setUsuarioPerfilActualLocal(null);
            this.LocalStorageService.RemovePerfilActualLocal();
            this.LocalStorageService.removeItem('Username');
            this.LocalStorageService.removeItem('perfilObjetivoCartera')
            this.usuariodb = usuarioRecibido;
            this.buscarPerfilUsuario(this.usuariodb).subscribe(
              (perfilUsuario: PerfilInversorAPI | null) => {
                this.AlmacenarUsuario_Perfil(perfilUsuario);
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
      },
      (error) => {
        this.loading = false;
        this.errorform = false;
        this.errorLogin = true;
        console.log("🚀 ~ file: login.component.ts:82 ~ LoginComponent ~ verfificarUsuario ~ errorLogin:", this.errorLogin)
        console.error("Error al buscar Usuario", error);
      });
  }

  public loginAdministrador() {
    this.loading = false;
    this.navegarAHomeAdministrador();
  }

  private AlmacenarUsuario_Perfil(perfilUsuario: PerfilInversorAPI | null) {
    //A nivel login la variable se llama username
    this.LocalStorageService.setItem('Username', this.usuariodb.username);
    console.log("🚀 ~ file: login.component.ts:78 ~ LoginComponent ~ verfificarUsuario ~ this.usuariodb.nombreUsuario:", this.usuariodb.username)
    if (perfilUsuario === null || perfilUsuario === undefined) {
      console.log("El usuario no tiene un perfil asociado");
      this.loading = false;
      this.LocalStorageService.setUsuarioPerfilActualLocal(this.usuariodb);
      this.LocalStorageService.SetPerfilActualLocal();
      this.navegarAPerfil();
    } else {
      console.log("El usuario con perfil asociado");
      this.loading = false;
      this.LocalStorageService.setPerfilSubjetivo(perfilUsuario);
      this.LocalStorageService.SetPerfilActualLocal();
      ///Verifica si el test que completo esra el objetivo , ebn caso de serlo actualiza la flag que usa cartera, y muestra el perfil obtenido
      
      if(perfilUsuario.tipoNivelConocimiento!=null||perfilUsuario.nivelConocimiento!=null){
      console.log("🚀 ~ file: login.component.ts:151 ~ LoginComponent ~ AlmacenarUsuario_Perfil ~ perfilUsuario.tipoNivelConocimiento!=null||perfilUsuario.tipoNivelConocimiento!", perfilUsuario.tipoNivelConocimiento!=null||perfilUsuario.nivelConocimiento!=null)
      console.log("🚀 ~ file: login.component.ts:150 ~ LoginComponent ~ AlmacenarUsuario_Perfil ~ tipoNivelConocimiento:", perfilUsuario.tipoNivelConocimiento)
      console.log("🚀 ~ file: login.component.ts:150 ~ LoginComponent ~ AlmacenarUsuario_Perfil ~ tipoNivelConocimiento:", perfilUsuario.nivelConocimiento)
      this.LocalStorageService.setItem('perfilObjetivoCartera', perfilUsuario.perfilInversor);
      }
     
      this.navegarAHome();
    }
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

  navegarAHomeAdministrador() {
    this.router.navigate(['dashboard/administrar']);
  }

}