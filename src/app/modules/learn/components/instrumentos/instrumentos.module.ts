import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentosRoutingModule } from './instrumentos-routing.module';
import { InstrumentosComponent } from './instrumentos.component';


@NgModule({
  declarations: [InstrumentosComponent],
  imports: [
    CommonModule,
    InstrumentosRoutingModule
  ]
})
export class InstrumentosModule { }
