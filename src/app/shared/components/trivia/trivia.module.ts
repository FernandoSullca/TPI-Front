import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriviaComponent } from 'src/app/shared/components/trivia/trivia.component';


@NgModule({
  declarations: [TriviaComponent],
  imports: [
    CommonModule,  
  ],
   exports: [TriviaComponent], // Exporta el componente para su uso en otros módulos
})
export class TriviaModule { }
