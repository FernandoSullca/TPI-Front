import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Componentes de las páginas
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { PricePanelComponent } from './features/dashboard/sections/price-panel/price-panel.component';
import { DefaultPathComponent } from './default-path/default-path.component';
import { PerfilSubjetivoComponent } from './features/perfil-subjetivo/perfil-subjetivo.component';
import { TestPerfilSubjetivoComponent } from './features/perfil-subjetivo/stages/test-perfil-subjetivo/test-perfil-subjetivo.component';
import { CarteraComponent } from './features/dashboard/sections/cartera/cartera.component'; 
import { PerfilSubjetivoResultadoComponent } from './features/perfil-subjetivo/stages/perfil-subjetivo-resultado/perfil-subjetivo-resultado.component';
import { PerfilInversorObjetivoPresentacionComponent } from './features/dashboard/sections/perfil-inversor-objetivo/perfil-inversor-objetivo-presentacion.component'; 
import { TestPerfilInversorObjetivoComponent } from './features/dashboard/sections/perfil-inversor-objetivo/stage/test-perfil-inversor-objetivo/test-perfil-inversor-objetivo.component';
import { AdministrarComponent } from './features/dashboard/sections/administrar/administrar.component';
import { AdministrarPreguntasComponent } from './features/dashboard/sections/administrar-preguntas/administrar-preguntas.component';
import { RegistroComponent } from './features/registro/registro.component';


const routes: Routes = [
  // Rutas de las páginas
  { path: '', component: LandingComponent }, // Redirección por defecto
  // { path: 'dashboard', component: DashboardComponent },
  //{ path: 'login', component: LoginComponent },
  /*{ path: 'login', component: LoginComponent },
  { path: "registro", component:  RegistroComponent},*/
  // { path: 'dashboard', component: DashboardComponent },
  /* { path: 'login', component: LoginComponent },
  { path: "perfil", component:  PerfilSubjetivoComponent},
  { path: "perfil-inversor", component:  TestPerfilSubjetivoComponent},
  { path: 'perfil-inversor-resultado', component:  PerfilSubjetivoResultadoComponent},
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'cartera', pathMatch: 'full' }, // Ruta por defecto del dashboard
      { path: 'precios', component: PricePanelComponent },
      { path: "perfil-inversor", component: PerfilInversorObjetivoPresentacionComponent},
      { path: "perfil-inversor-cuestionario", component: TestPerfilInversorObjetivoComponent},
      { path: "Administrar", component: AdministrarComponent},
      { path: "Administrar-Preguntas", component: AdministrarPreguntasComponent},
      { path: "cartera", component: CarteraComponent},
    ],
  },
  // Otras rutas o manejo de errores
  //{ path: '**', component: DefaultPathComponent }, // Manejo de rutas no encontradas
  */
  { path: '**', redirectTo: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
