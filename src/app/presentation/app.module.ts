import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgbProgressbar ,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'; 
import { PricePanelComponent } from './features/dashboard/sections/price-panel/price-panel.component';
import { PerfilSubjetivoComponent } from './features/perfil-subjetivo/perfil-subjetivo.component';
import { TestPerfilSubjetivoComponent } from './features/perfil-subjetivo/stages/test-perfil-subjetivo/test-perfil-subjetivo.component';
import { MessageComponent } from 'src/app/presentation/common/components/message/message.component';
import { CarteraComponent } from './features/dashboard/sections/cartera/cartera.component';
import { GraficoComponent } from 'src/app/presentation/common/components/grafico/grafico.component';
import { PerfilSubjetivoResultadoComponent } from './features/perfil-subjetivo/stages/perfil-subjetivo-resultado/perfil-subjetivo-resultado.component';
import { PerfilInversorObjetivoPresentacionComponent } from './features/dashboard/sections/perfil-inversor-objetivo/perfil-inversor-objetivo-presentacion.component'; 
import { TestPerfilInversorObjetivoComponent } from './features/dashboard/sections/perfil-inversor-objetivo/stage/test-perfil-inversor-objetivo/test-perfil-inversor-objetivo.component';
import { AdministrarComponent } from './features/dashboard/sections/administrar/administrar.component';
import { AdministrarPreguntasComponent } from './features/dashboard/sections/administrar-preguntas/administrar-preguntas.component';
import { ModalComponent } from 'src/app/presentation/common/components/modal/modal.component';
import { GraficoVelasComponent } from 'src/app/presentation/common/components/grafico-velas/grafico-velas.component';
import { QRCodeModule } from 'angularx-qrcode';

import { GraficoLineaComponent } from 'src/app/presentation/common/components/grafico-linea/grafico-linea.component';
import { FormatoValorPipe } from 'src/app/presentation/common/pipes/formato-valor/formato-valor.pipe';
import { RegistroComponent } from './common/components/registro/registro.component';
import { PrediccionComponent } from './features/dashboard/sections/prediccion/prediccion.component';
import { ModalSugeridoComponent } from './common/components/modal-sugerido/modal-sugerido.component';
import { RegistarUsuarioComponent } from './features/registar-usuario/registar-usuario.component';
import { ActivarCuentaComponent } from './features/activar-cuenta/activar-cuenta.component';
import { RendimientoComponent } from './features/dashboard/sections/rendimiento/rendimiento.component';
import { FechaLocalPipe } from './common/pipes/fecha-local/fecha-local.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LandingComponent,
    PricePanelComponent,
    PerfilSubjetivoComponent,
    TestPerfilSubjetivoComponent,
    TestPerfilInversorObjetivoComponent,
    MessageComponent,
    CarteraComponent,
    GraficoComponent,
    PerfilSubjetivoResultadoComponent,
    PerfilInversorObjetivoPresentacionComponent,
    AdministrarComponent,
    AdministrarPreguntasComponent,
    ModalComponent,
    GraficoVelasComponent,
    RegistroComponent,
    GraficoLineaComponent,
    FormatoValorPipe,
    PrediccionComponent,
    ModalSugeridoComponent,
    RegistarUsuarioComponent,
    ActivarCuentaComponent,
    RendimientoComponent,
    FechaLocalPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
    QRCodeModule,
    NgbProgressbar

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
