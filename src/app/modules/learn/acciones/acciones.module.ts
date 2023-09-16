import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccionesRoutingModule } from './acciones-routing.module';
import { AccionesComponent } from './acciones.component';

@NgModule({
  declarations: [AccionesComponent],
  imports: [
    CommonModule,AccionesRoutingModule
  ]
})

export class AccionesModule { }
