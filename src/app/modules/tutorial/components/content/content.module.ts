import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule,ContentRoutingModule,NgbModule
  ]
})
export class ContentModule { }
