import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionesComponent } from './acciones.component';


const routes: Routes = [
  { path: '', component:AccionesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccionesRoutingModule { }
