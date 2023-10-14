import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StageOneComponent } from './stage-one.component';
import { PreguntaSubjetivasService } from 'src/app/core/services/dataLocalSercices/Preguntas-Subjetivas/preguntaSubjetiva.service';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
import { of } from 'rxjs';

describe('StageOneComponent', () => {
  let component: StageOneComponent;
  let fixture: ComponentFixture<StageOneComponent>;

  // Creamos stubs de los servicios
  const preguntaSubjetivasServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    getCuestionario: () => of([]),
  };

  const questionsProfileServiceStub = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    // obtenerTestSubjetivo: () => of({}),
    //Debido al que es por APi es diferente a la declaracion del Lectura observable
    obtenerTestSubjetivo: () => Promise.resolve({ /* datos simulados aquí */ }),
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [StageOneComponent],
      // Utiliza los stubs en lugar de los servicios reales
      providers: [
        { provide: PreguntaSubjetivasService, useValue: preguntaSubjetivasServiceStub },
        { provide: QuestionsProfileService, useValue: questionsProfileServiceStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(StageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
