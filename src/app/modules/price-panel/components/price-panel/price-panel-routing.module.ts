import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricePanelComponent } from './price-panel.component';

const routes: Routes = [
  { path: '', component:PricePanelComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricePanelRoutingModule { }
