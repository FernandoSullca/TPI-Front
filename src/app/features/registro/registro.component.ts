import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario: any = {
    username: '',
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  
  constructor(private registroUsuarioService: RegistroService
    , private router: Router
    , private LocalStorageService:LocalStorageService) {}


  registrarUsuario() {
    this.registroUsuarioService.registrarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.almacenarUsuario(this.usuario);
        this.navegarAPerfil()
      },
      (error) => {
        console.error('Error al registrar el usuario', error);
        // Maneja el error de acuerdo a tus necesidades.
      }
    );
  }

  almacenarUsuario(usuario: any) {
    this.LocalStorageService.setItem("Username",usuario.username);
  }

  navegarAPerfil(){
    this.router.navigate(['/perfil']); 
  }
  
}
