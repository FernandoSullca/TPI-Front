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

const routes: Routes = [
    // Rutas de las páginas
    { path: '', component: LandingComponent }, // Redirección por defecto
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: '', redirectTo: 'precio', pathMatch: 'full' }, // Ruta por defecto del dashboard
        { path: 'precio', component: PricePanelComponent },
        { path: 'otro', component: OtroComponent },
      ],
    },
    // Otras rutas o manejo de errores
    { path: '**', component: DefaultPathComponent}, // Manejo de rutas no encontradas
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule],
})
export class AppRoutingModule { }
