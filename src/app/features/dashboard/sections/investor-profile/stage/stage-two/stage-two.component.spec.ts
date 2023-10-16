import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageTwoComponent } from './stage-two.component';
import { PreguntaObjetivasService } from 'src/app/core/services/dataLocalServices/Preguntas-Objetivas/preguntaObjetiva.service';
import { QuestionsTargetService } from 'src/app/core/services/api/target-profile/questions-target-profile.service';
import { of } from 'rxjs';

describe('StageTwoComponent', () => {
  let component: StageTwoComponent;
  let fixture: ComponentFixture<StageTwoComponent>;


    // Creamos stubs de los servicios
    const preguntaObjetivasServiceStub = {
      // Define aquí tus métodos simulados
      // Por ejemplo:
      getPreguntas: () => of([]),
    };
  
    const questionsProfileTargetServiceStub = {
      // Define aquí tus métodos simulados
      // Por ejemplo:
      // obtenerTestSubjetivo: () => of({}),
      //Debido al que es por APi es diferente a la declaracion del Lectura observable
      obtenerTestObjetivo: () => Promise.resolve({ /* datos simulados aquí */ }),
    };

    
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageTwoComponent],
       providers: [
        { provide: PreguntaObjetivasService, useValue: preguntaObjetivasServiceStub },
        { provide: QuestionsTargetService, useValue: questionsProfileTargetServiceStub },
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(StageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
