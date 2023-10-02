import { Component, OnInit } from '@angular/core';
import { Cuestionario, Respuesta,RespuestaBnt  } from 'src/app/core/models/profile-inicial/questions-profile.model';
import { QuestionsProfileService } from 'src/app/core/services/api/DataLocalService/questions-profile.service';
@Component({
  selector: 'app-stage-one',
  templateUrl: './stage-one.component.html',
  styleUrls: ['./stage-one.component.scss']
})
export class StageOneComponent implements OnInit{
  cuestionario: Cuestionario= {
    preguntas: [],
  };

  
  constructor(private questionsService: QuestionsProfileService) { }

  ngOnInit(): void {
   
       // Llamas al método del servicio para obtener el cuestionario
    // Si estás utilizando el método que devuelve el JSON local, puedes hacerlo así:
    // this.cuestionario = this.questionsService.getCuestionarioInicial();

    // Si estás utilizando el método que realiza una solicitud HTTP, puedes hacerlo así:
    // this.questionsService.getCuestionario().subscribe((data) => {
    //   this.cuestionario = data;
    // });

    // Ejemplo usando el método con el JSON local (descomenta esta línea y comenta la línea siguiente si es tu caso):
    this.cuestionario = this.questionsService.getCuestionarioInicial();
  }

  isArray(respuestas: string[] | Respuesta[]): respuestas is string[] {
    return Array.isArray(respuestas);
  }
  
  isArraybnt(respuestas: string[] | RespuestaBnt[]): respuestas is RespuestaBnt[] {
    return Array.isArray(respuestas);
  }
}
