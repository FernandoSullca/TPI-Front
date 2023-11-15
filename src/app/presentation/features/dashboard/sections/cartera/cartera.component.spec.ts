import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteraComponent } from './cartera.component';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormatoValorPipe } from 'src/app/presentation/common/pipes/formato-valor/formato-valor.pipe';

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
      imports:[HttpClientTestingModule],
      declarations: [CarteraComponent,FormatoValorPipe],
      providers: [
        { provide: CarteraService, useValue: carteraServiceStub }
      ],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents()
    fixture = TestBed.createComponent(CarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mostrarValuacion',()=>{
    const fixture = TestBed.createComponent(CarteraComponent);
    let app : CarteraComponent = fixture.componentInstance;
    
    app.cartera = {
      "totalCartera": 12,
      "totalInstrumentos": 77,
      "totalMonedas": 454,
      "cantidadPorInstrumento": [
        { "simbolo": "MOCK", "cantidad": 11 },
        { "simbolo": "TNC", "cantidad": 100 }
      ]
  };
    
    
    expect(app.mostrarValuacionTotalCartera()).toEqual(12);

    app.cartera.totalCartera=0;
    expect(app.mostrarValuacionTotalCartera()).toEqual(0);

  })

});
