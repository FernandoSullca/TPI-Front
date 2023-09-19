import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcionesRoutingModule } from './opciones-routing.module';
import { OpcionesComponent } from './opciones.component';

import { TriviaModule } from 'src/app/shared/components/trivia/trivia.module';


@NgModule({
  declarations: [OpcionesComponent],
  imports: [
    CommonModule,
    OpcionesRoutingModule, TriviaModule
   
  ]
})
export class OpcionesModule { }
