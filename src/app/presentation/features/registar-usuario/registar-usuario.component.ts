import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-registar-usuario',
  templateUrl: './registar-usuario.component.html',
  styleUrls: ['./registar-usuario.component.scss']
})
export class RegistarUsuarioComponent implements OnInit{

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

  errorEntradas: boolean = false;
  errorReg: boolean = false;
  registro: boolean = false;

  constructor(private registroUsuarioService: RegistroService
    , private router: Router
    , private LocalStorageService: LocalStorageService) { }

    ngOnInit(): void {
    this.errorReg = false;
    }

  registrarUsuario() {
  
    console.log("🚀 ~ file: registar-usuario.component.ts:15 ~ RegistarUsuarioComponent ~ usuarioForm:", this.usuarioForm)
    console.log("🚀 ~ file: registar-usuario.component.ts:15 ~ RegistarUsuarioComponent ~ usuarioForm:", this.usuarioForm.password)
    if (!this.validarCampos()) {
      this.errorEntradas = true;
      console.log("Error de campos enviados")
      return;
    }
    this.registroUsuarioService.registrarNuevoUsuario(this.usuarioForm).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.registro = true;
      },
      (error) => {
        this.errorReg = true;
        this.registro = false;
        console.error('Error al registrar el usuario', error);
      }
    );
    console.log("🚀 ~ file: registar-usuario.component.ts:60 ~ RegistarUsuarioComponent ~ registrarUsuario ~ usuarioForm:", this.usuarioForm)
  }

  validarCampos(): boolean {
    if (!this.usuarioForm.username ||
      !this.usuarioForm.name ||
      !this.usuarioForm.lastname ||
      !this.usuarioForm.email ||
      !this.usuarioForm.password) {
      console.log("🚀 ~ file: registar-usuario.component.ts:65 ~ RegistarUsuarioComponent ~ validarCampos ~ usuarioForm:", this.usuarioForm)

      return false;
    }
    console.log("🚀 ~ file: registar-usuario.component.ts:65 ~ RegistarUsuarioComponent ~ validarCampos ~ usuarioForm:", this.usuarioForm)
    return true;
  }




}
