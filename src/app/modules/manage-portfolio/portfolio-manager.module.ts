import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDetailsRoutingModule } from './components/portfolio-details/portfolio-details-routing.module';
import { PortfolioRoutingModule } from './components/portfolio/portfolio-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,PortfolioRoutingModule,PortfolioDetailsRoutingModule
  ]
})
export class ManagePortfolioModule { }
