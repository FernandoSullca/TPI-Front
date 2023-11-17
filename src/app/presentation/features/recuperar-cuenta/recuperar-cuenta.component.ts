import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.scss']
})
export class RecuperarCuentaComponent {
  public loading = false;
  public error = false;
  public token = '';
  public newPassword = '';
  public newPasswordRepeat = '';
  public errorServer = false;
  public success = false;

  constructor(
    private registroUsuarioService: RegistroService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.token = this.activateRoute.snapshot.queryParams["token"].replace(/ /g, "+");
  }
  recuperarCuenta() {
    if (this.newPassword !== this.newPasswordRepeat) {
      this.error = true;
      return false;
    }
    this.loading = true;
    this.registroUsuarioService.CambiarPassword(this.token, this.newPassword).subscribe(
      (response) => {
        this.loading = false
        this.error = false;
        this.success = true;
      },
      (error) => {
        this.loading = false;
        this.errorServer = true;
      }
    );
    return true;

  }

}
