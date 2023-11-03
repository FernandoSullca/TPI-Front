import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-registar-usuario',
  templateUrl: './registar-usuario.component.html',
  styleUrls: ['./registar-usuario.component.scss']
})
export class RegistarUsuarioComponent {

  usuarioForm: any = {
    username: '',
    name: '',
    lastname: '',
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

  errorReg: boolean = false;
  registro: boolean = false;

  constructor(private registroUsuarioService: RegistroService
    , private router: Router
    , private LocalStorageService: LocalStorageService) { }

  registrarUsuario() { 
    this.errorReg=false;
    if (!this.validarCampos()) {
      this.errorReg = true;
      console.log("Error de campos enviados")
      return; 
    }
    this.registroUsuarioService.registrarNuevoUsuario(this.usuarioForm).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.registro=true;
      },
      (error) => {
        this.errorReg=true;
        this.registro=false;
        console.error('Error al registrar el usuario', error);
      }
    );
  }

  validarCampos(): boolean {
    if (!this.usuarioForm.username || 
      !this.usuarioForm.name || 
      !this.usuarioForm.lastname ||
      !this.usuarioForm.email ) {
      return false;
    }
    return true;
  }



  
}
