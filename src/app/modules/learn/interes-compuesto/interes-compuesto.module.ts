import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteresCompuestoComponent } from './interes-compuesto.component';
import { InteresCompuestoRoutingModule } from './interes-compuesto-routing.module';



@NgModule({
  declarations: [InteresCompuestoComponent],
  imports: [
    CommonModule,InteresCompuestoRoutingModule
  ]
})
export class InteresCompuestoModule { }
