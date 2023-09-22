import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePanelComponent } from './price-panel.component';
import { PricePanelRoutingModule } from './price-panel-routing.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
  imports: [
    CommonModule,PricePanelRoutingModule,NgbModule
  ],
  declarations: [
    PricePanelComponent
  ]
})
export class PricePanelModule { }
