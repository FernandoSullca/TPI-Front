import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { PricePanelComponent } from './features/dashboard/sections/price-panel/price-panel.component';
import { PerfilSubjetivoComponent } from './features/perfil-subjetivo/perfil-subjetivo.component';
import { StageOneComponent } from './features/perfil-subjetivo/stages/stage-one/stage-one.component';
import { MessageComponent } from './common/message/message.component';
import { CarteraComponent } from './features/dashboard/sections/cartera/cartera.component';
import { GraficoComponent } from './common/grafico/grafico.component';
import { StageResultComponent } from './features/perfil-subjetivo/stages/stage-result/stage-result.component';
import { InvestorProfileComponent } from './features/dashboard/sections/investor-profile/investor-profile.component'; 
import { StageTwoComponent } from './features/dashboard/sections/investor-profile/stage/stage-two/stage-two.component';
import { AdministrarComponent } from './features/dashboard/sections/administrar/administrar.component';
import { AdministrarPreguntasComponent } from './features/dashboard/sections/administrar-preguntas/administrar-preguntas.component';
import { ModalComponent } from './common/modal/modal.component';
import { GraficoVelasComponent } from './common/grafico-velas/grafico-velas.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RegistroComponent } from './features/registro/registro.component';
import { GraficoLineaComponent } from './common/grafico-linea/grafico-linea.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LandingComponent,
    PricePanelComponent,
    PerfilSubjetivoComponent,
    StageOneComponent,
    StageTwoComponent,
    MessageComponent,
    CarteraComponent,
    GraficoComponent,
    StageResultComponent,
    InvestorProfileComponent,
    AdministrarComponent,
    AdministrarPreguntasComponent,
    ModalComponent,
    GraficoVelasComponent,
    RegistroComponent,
    GraficoLineaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
    QRCodeModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
