import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.scss']
})
export class ActivarCuentaComponent {
  public loading: boolean = true;
  public token : string = '';
  public error : boolean = false;
  constructor(
    private registroUsuarioService: RegistroService,
    private activateRoute: ActivatedRoute
  ) { }
  

  ngOnInit(): void {
    this.token = this.activateRoute.snapshot.queryParams["token"];
    this.registrarToken();
  }



  registrarToken() {
    
    this.registroUsuarioService.ActivarConToken(this.token).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.loading = false
      },
      (error) => {
        this.loading = true
        this.error = true;
        console.error('Error al registrar el usuario', error);
      }
    );
  }


}
