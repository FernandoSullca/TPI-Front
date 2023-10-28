import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent {
  usuarioForm: any = {
    username: '',
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  usuariodb: UsuarioAPI = {
    oid: 0,
    nombreUsuario: "",
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    pass: "",
    cuentaConfirmada: false,
    activo: false
  }

  errorReg: boolean = false;

  constructor(private registroUsuarioService: RegistroService
    , private router: Router
    , private LocalStorageService: LocalStorageService) { }

  registrarUsuario() { 
    this.errorReg=false;
    if (!this.validarCampos()) {
      this.errorReg = true;
      console.log("Error de campos enviados")
      return; // No envía la solicitud si los campos no son válidos
    }
    this.registroUsuarioService.registrarUsuario(this.usuarioForm).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.almacenarUsuario(this.usuarioForm);
        this.navegarAPerfil();
      },
      (error) => {
        this.errorReg=true;
        console.error('Error al registrar el usuario', error);
      }
    );
  }

  almacenarUsuario(usuario: any) {
    usuario.email = usuario.username;
    this.registroUsuarioService.buscarUsuario(usuario.email).subscribe(
      (usuarioRecibido: UsuarioAPI) => {
        this.usuariodb = usuarioRecibido;
        // this.LocalStorageService.setItem("Username", usuario.username);
        this.LocalStorageService.setUsuarioPerfilActualLocal(this.usuariodb);
        this.LocalStorageService.SetPerfilActualLocal();
      },
      (error) => {
        console.error('Error al buscar el usuario', error);
      }
    );

  }

  navegarAPerfil() {
    this.router.navigate(['/perfil']);
  }

  validarCampos(): boolean {
    if (!this.usuarioForm.username || !this.usuarioForm.name || !this.usuarioForm.lastname) {
      return false;
    }
    return true;
  }

}
