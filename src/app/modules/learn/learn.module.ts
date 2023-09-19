import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InteresCompuestoModule } from './components/interes-compuesto';
import { AccionesModule } from './components/acciones';
import { InstrumentosModule } from './components/instrumentos';
import { OpcionesModule } from './components/opciones';
import { TriviaComponent } from 'src/app/shared/components';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,AccionesModule,InteresCompuestoModule,
  InstrumentosModule,OpcionesModule
  ]
})
export class LearnModule { }
