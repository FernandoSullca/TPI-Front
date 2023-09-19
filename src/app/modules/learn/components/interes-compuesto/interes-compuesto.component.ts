import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';
import { DataServiceService } from 'src/app/core/services/api/DataLocalService/data-service.service';

@Component({
  selector: 'app-interes-compuesto',
  templateUrl: './interes-compuesto.component.html',
  styleUrls: ['./interes-compuesto.component.scss']
})
export class InteresCompuestoComponent implements OnInit {
  tematicaSeleccionada: string = 'Interese Compuestos'; // Temática seleccionada
  constructor(private DataService: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    // Llama al servicio para obtener trivias por la temática seleccionada

  }


}
