import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"home",loadChildren:()=>import('./modules').then(m=>m.HomeModule)},
  {path:"login",loadChildren:()=>import('./modules').then(m=>m.LoginModule)},
  {path:"register",loadChildren:()=>import('./modules').then(m=>m.RegisterModule)},
  {path:"portfolio",loadChildren:()=>import('./modules').then(m=>m.PortfolioModule)},
  {path:"portfolio-details",loadChildren:()=>import('./modules').then(m=>m.PortfolioDetailsComponent)},
  {path:"tutorial",loadChildren:()=>import('./modules').then(m=>m.ContentModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }