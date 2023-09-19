import { Component, OnInit } from '@angular/core';
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/core/services/api/DataLocalService/data-service.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.scss']
})

export class AccionesComponent implements OnInit {

  buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto
  tematicaSeleccionada: string = 'Acciones'; // Temática seleccionada
  
  trivias: Trivia[]=[];

  constructor(private DataService: DataServiceService,private router: Router) { }

  ngOnInit(): void {
    // loadQuestion();Carga las preguntas desde el archivo JSON cuando se inicie el componente
  
  }

  loadQuestion(): void {
    this.trivias = this.DataService.getTriviasByTematica(this.tematicaSeleccionada);
    // this.quest = this.getQuestion(this.trivias);
    // this.options = this.getOptions(this.trivias);
    // console.log(this.trivias)
    // console.log(this.quest)
    // console.log(this.options)
  }

}
