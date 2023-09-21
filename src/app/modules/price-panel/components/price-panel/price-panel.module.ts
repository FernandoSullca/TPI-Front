import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePanelComponent } from './price-panel.component';
import { PricePanelRoutingModule } from './price-panel-routing.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    PricePanelComponent
  ],
  imports: [
    CommonModule,PricePanelRoutingModule
  ]
})
export class PricePanelModule { }
