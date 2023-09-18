import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcionesRoutingModule } from './opciones-routing.module';
import { OpcionesComponent } from './opciones.component';


@NgModule({
  declarations: [OpcionesComponent],
  imports: [
    CommonModule,
    OpcionesRoutingModule
  ]
})
export class OpcionesModule { }
