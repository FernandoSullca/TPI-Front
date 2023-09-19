import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentosRoutingModule } from './instrumentos-routing.module';
import { InstrumentosComponent } from './instrumentos.component';
import { TriviaModule } from 'src/app/shared/components/trivia/trivia.module';


@NgModule({
  declarations: [InstrumentosComponent],
  imports: [
    CommonModule,
    InstrumentosRoutingModule,
    TriviaModule//Importo el componente compartido
  ]
})
export class InstrumentosModule { }
