import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

//import { TimeLineComponent,TriviaComponent  } from './shared/components';//tratar de evitar inclucuir en app-module componentes compartidos que recive (not singletons )o enviara informacion o compostamiento(posibles errore de recursividad en llamadas)


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
