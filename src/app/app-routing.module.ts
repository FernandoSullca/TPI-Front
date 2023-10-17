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
import { DefaultPathComponent } from './default-path/default-path.component';
import { PerfilSubjetivoComponent } from './features/perfil-subjetivo/perfil-subjetivo.component';
import { StageOneComponent } from './features/perfil-subjetivo/stages/stage-one/stage-one.component';
import { CarteraComponent } from './features/dashboard/sections/cartera/cartera.component'; 
// import { StageTwoComponent } from './features/dashboard/sections/perfil-inversor/stage/stage-two/stage-two.component';
import { StageResultComponent } from './features/perfil-subjetivo/stages/stage-result/stage-result.component';
import { InvestorProfileComponent } from './features/dashboard/sections/investor-profile/investor-profile.component';
import { StageTwoComponent } from './features/dashboard/sections/investor-profile/stage/stage-two/stage-two.component';
import { AdministrarComponent } from './features/dashboard/sections/administrar/administrar.component';
import { AdministrarPreguntasComponent } from './features/dashboard/sections/administrar-preguntas/administrar-preguntas.component';

const routes: Routes = [
  // Rutas de las páginas
  { path: '', component: LandingComponent }, // Redirección por defecto
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: "perfil", component:  PerfilSubjetivoComponent},
  { path: "perfil-inversor", component:  StageOneComponent},
  // { path: 'perfil-inversor-resultado/:perfil', component:  StageResultComponent},
  { path: 'perfil-inversor-resultado', component:  StageResultComponent},
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'cartera', pathMatch: 'full' }, // Ruta por defecto del dashboard
      { path: 'precios', component: PricePanelComponent },
      // { path: 'tutorial', component: ContentComponent },
      // { path: "perfil-inversor", component: PerfilInversorComponent},
      { path: "perfil-inversor", component: InvestorProfileComponent},
      { path: "perfil-inversor-cuestionario", component: StageTwoComponent},
      { path: "Administrar", component: AdministrarComponent},
      { path: "Administrar-Preguntas", component: AdministrarPreguntasComponent},
      { path: "cartera", component: CarteraComponent}
      // { path: "perfil-inversor-cuestionario", component: StageTwoComponent},
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
