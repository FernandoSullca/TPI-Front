import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteraComponent } from './cartera.component';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { of } from 'rxjs';
import { GraficoComponent } from '../grafico/grafico.component';

describe('CarteraComponent', () => {
  let component: CarteraComponent;
  let fixture: ComponentFixture<CarteraComponent>;

  const carteraServiceStub  = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    // obtenerTestSubjetivo: () => of({}),
    //Debido al que es por APi es diferente a la declaracion del Lectura observable
    getCartera: () => of([]),
  };

  const GraficoServiceStub  = {
    // Define aquí tus métodos simulados
    // Por ejemplo:
    // obtenerTestSubjetivo: () => of({}),
    //Debido al que es por APi es diferente a la declaracion del Lectura observable
    // getCartera: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteraComponent],
      providers: [
        { provide: CarteraService, useValue: carteraServiceStub }
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(CarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
