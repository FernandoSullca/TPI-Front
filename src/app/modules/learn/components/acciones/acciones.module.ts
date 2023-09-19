import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccionesRoutingModule } from './acciones-routing.module';
import { AccionesComponent } from './acciones.component';
import { TriviaModule } from 'src/app/shared/components/trivia/trivia.module';

@NgModule({
  declarations: [AccionesComponent],
  imports: [
    CommonModule,AccionesRoutingModule,
    TriviaModule
  ]
})

export class AccionesModule { }
