import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPreguntasComponent } from './administrar-preguntas.component';
import { AdministrarPreguntasService } from 'src/app/core/services/api/administracion/administrar-preguntas.service';

xdescribe('AdministrarPreguntasComponent', () => {
  let component: AdministrarPreguntasComponent;
  let fixture: ComponentFixture<AdministrarPreguntasComponent>;
  const administrarPreguntasServiceStub = {
    
  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarPreguntasComponent],
      providers: [
        { provide: AdministrarPreguntasService, useValue: administrarPreguntasServiceStub },
      ]
    });
    fixture = TestBed.createComponent(AdministrarPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
