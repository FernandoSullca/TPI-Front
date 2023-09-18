import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioModule } from './components/portfolio';
import { PortfolioDetailsModule } from './components/portfolio-details';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,PortfolioModule,PortfolioDetailsModule
  ]
})
export class ManagePortfolioModule { }
