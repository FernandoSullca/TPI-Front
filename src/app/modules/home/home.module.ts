import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TimeLineComponent } from 'src/app/shared/components/time-line';



@NgModule({
  declarations: [HomeComponent,TimeLineComponent],
  imports: [
    CommonModule,HomeRoutingModule
  ]
})
export class HomeModule { }
