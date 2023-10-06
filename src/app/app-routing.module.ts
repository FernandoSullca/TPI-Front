import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Componentes de las páginas
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
// import { Screen1Component } from './features/dashboard/screens/screen1/screen1.component';
// import { Screen2Component } from './features/dashboard/screens/screen2/screen2.component';
import { LandingComponent } from './features/landing/landing.component';
import { PricePanelComponent } from './features/dashboard/sections/price-panel/price-panel.component';
import { OtroComponent } from './features/dashboard/sections/otro/otro.component';
import { DefaultPathComponent } from './default-path/default-path.component';
import { AccionesComponent } from './features/dashboard/sections/acciones/acciones.component';
import { ContentComponent } from './features/dashboard/sections/content/content.component';
import { InteresCompuestoComponent } from './features/dashboard/sections/interes-compuesto/interes-compuesto.component';
import { OpcionesComponent } from './features/dashboard/sections/opciones/opciones.component';
import { PerfilSubjetivoComponent } from './features/perfil-subjetivo/perfil-subjetivo.component';
import { StageOneComponent } from './features/perfil-subjetivo/stages/stage-one/stage-one.component';
import { PerfilInversorComponent } from './features/dashboard/sections/perfil-inversor/perfil-inversor.component';
import { StageTwoComponent } from './features/dashboard/sections/perfil-inversor/stage/stage-two/stage-two.component';
import { CarteraComponent } from './features/dashboard/sections/cartera/cartera.component'; 

const routes: Routes = [
  // Rutas de las páginas
  { path: '', component: LandingComponent }, // Redirección por defecto
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: "perfil", component:  PerfilSubjetivoComponent},
  { path: "perfil-inversor", component:  StageOneComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'tutorial', pathMatch: 'full' }, // Ruta por defecto del dashboard
      { path: 'precios', component: PricePanelComponent },
      // { path: 'otro', component: OtroComponent },
      { path: 'tutorial', component: ContentComponent },
      { path: "aprender-acciones", component: AccionesComponent },
      { path: "aprender-interes", component:  InteresCompuestoComponent},
      { path: "aprender-instrumentos", component:  InteresCompuestoComponent},
      { path: "aprender-opciones", component:  OpcionesComponent},
      { path: "perfil-inversor", component: PerfilInversorComponent},
      { path: "perfil-inversor-questions", component: StageTwoComponent},
      { path: "cartera", component: CarteraComponent}
    ],
  },
  // Otras rutas o manejo de errores
  { path: '**', component: DefaultPathComponent }, // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
