import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccionesRoutingModule } from './components/acciones/acciones-routing.module';
import { InteresCompuestoRoutingModule } from './components/interes-compuesto/interes-compuesto-routing.module';
import { InstrumentosRoutingModule } from './components/instrumentos/instrumentos-routing.module';
import { OpcionesRoutingModule } from './components/opciones/opciones-routing.module';
import { InteresCompuestoModule } from './components/interes-compuesto';
import { AccionesModule } from './components/acciones';
import { InstrumentosModule } from './components/instrumentos';
import { OpcionesModule } from './components/opciones';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,AccionesModule,InteresCompuestoModule,
  InstrumentosModule,OpcionesModule
  ]
})
export class LearnModule { }
