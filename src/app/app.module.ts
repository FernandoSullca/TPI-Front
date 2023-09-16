import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TimeLineComponent } from './shared/components';
import { DefaultPathComponent } from './default-path/default-path.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    DefaultPathComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    TimeLineComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
