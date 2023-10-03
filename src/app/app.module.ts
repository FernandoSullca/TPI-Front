import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ContentComponent } from './features/dashboard/sections/content/content.component';
import { AccionesComponent } from './features/dashboard/sections/acciones/acciones.component';
import { InteresCompuestoComponent } from './features/dashboard/sections/interes-compuesto/interes-compuesto.component';
import { InstrumentosComponent } from './features/dashboard/sections/instrumentos/instrumentos.component';
import { OpcionesComponent } from './features/dashboard/sections/opciones/opciones.component';
import { PricePanelComponent } from './features/dashboard/sections/price-panel/price-panel.component';
import { TriviaComponent } from './features/dashboard/sections/trivia/trivia.component';
import { OtroComponent } from './features/dashboard/sections/otro/otro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LandingComponent,
    ContentComponent,
    AccionesComponent,
    InteresCompuestoComponent,
    InstrumentosComponent,
    OpcionesComponent,
    PricePanelComponent,
    TriviaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
