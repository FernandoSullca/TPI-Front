import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteresCompuestoComponent } from './interes-compuesto.component';
import { InteresCompuestoRoutingModule } from './interes-compuesto-routing.module';
import { TriviaModule } from 'src/app/shared/components/trivia/trivia.module';



@NgModule({
  declarations: [InteresCompuestoComponent],
  imports: [
    CommonModule,InteresCompuestoRoutingModule,
    TriviaModule
  ]
})
export class InteresCompuestoModule { }
