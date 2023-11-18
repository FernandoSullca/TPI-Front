import { Component, OnInit } from '@angular/core';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-registar-usuario',
  templateUrl: './registar-usuario.component.html',
  styleUrls: ['./registar-usuario.component.scss']
})
export class RegistarUsuarioComponent implements OnInit {

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

  loading = false;
  errorEntradas: boolean = false;
  errorReg: boolean = false;
  registro: boolean = false;

  constructor(private registroUsuarioService: RegistroService) {

  }

  ngOnInit(): void {
    this.errorReg = false;
  }

  public registrarUsuario() {
    if (!this.validarCampos()) {
      this.errorEntradas = true;
      console.log("Error de campos enviados")
      return;
    }

    this.loading = true;

    this.registroUsuarioService.registrarNuevoUsuario(this.usuarioForm).subscribe(
      (response) => {
        this.loading = false;
        this.registro = true;
      },
      (error) => {
        this.loading = false;
        this.errorReg = true;
        this.registro = false;
        console.error('Error al registrar el usuario', error);
      }
    );
  }

  validarCampos(): boolean {
    if (!this.usuarioForm.username ||
      !this.usuarioForm.name ||
      !this.usuarioForm.lastname ||
      !this.usuarioForm.email ||
      !this.usuarioForm.password) {

      return false;
    }
    return true;
  }

}
