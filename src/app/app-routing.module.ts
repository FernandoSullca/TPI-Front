import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"home",loadChildren:()=>import('./modules').then(m=>m.HomeModule)},
  {path:"login",loadChildren:()=>import('./modules').then(m=>m.LoginModule)},
  {path:"register",loadChildren:()=>import('./modules').then(m=>m.RegisterModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
