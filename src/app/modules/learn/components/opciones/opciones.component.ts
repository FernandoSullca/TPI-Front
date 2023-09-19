import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';
import { DataServiceService } from 'src/app/core/services/api/DataLocalService/data-service.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})

export class OpcionesComponent {
  tematicaSeleccionada: string = 'Opciones'; // Temática seleccionada

  constructor(private DataService: DataServiceService, private router: Router) { }


ngOnInit(): void {
  // Llama al servicio para obtener trivias por la temática seleccionada
}

}
