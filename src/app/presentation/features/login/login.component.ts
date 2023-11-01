import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuarioForm: any = {
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

  constructor(private registroUsuarioService: RegistroService,

    private LocalStorageService: LocalStorageService
    , private router: Router
  ) { }

  ngOnInit(): void {
    // console.log('asdas')
  }
  public verificarUsuario() {

    this.registroUsuarioService.buscarUsuario(this.usuarioForm.email).subscribe(
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

}
