import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoVelasComponent } from './grafico-velas.component';
import { FormatoValorPipe } from '../../pipes/pipe-formato-valor/formato-valor.pipe';
import { SolapaDetalleInstrumento } from 'src/app/core/models/detalle-instrumento/detalle-instrumento';

  describe('GraficoVelasComponent', () => {
  let component: GraficoVelasComponent;
  let fixture: ComponentFixture<GraficoVelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoVelasComponent,FormatoValorPipe]
    });
    fixture = TestBed.createComponent(GraficoVelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    component.solapaDetalleInstrumento ={
      "datosGraficoVelas": [
        {
          "tiempo": "2023-10-28T09:00:00",
          "precioDeApertura": "100.50",
          "maximo": "105.75",
          "minimo": "98.20",
          "precioDeCierre": "104.80"
        },
        {
          "tiempo": "2023-10-28T10:00:00",
          "precioDeApertura": "104.90",
          "maximo": "108.20",
          "minimo": "103.50",
          "precioDeCierre": "107.60"
        }
      ],
      "detalleInstrumento": {
        "simbolo": "EJEMPLO",
        "categoriaInstrumento": "Acciones",
        "puntas": {
          "cantidadCompra": 50,
          "precioCompra": 104.50,
          "cantidadVenta": 30,
          "precioVenta": 107.20,
          "deleted": false
        },
        "ultimoPrecio": 107.60,
        "variacionPorcentual": 2.56,
        "apertura": 104.90,
        "maximo": 108.20,
        "minimo": 103.50,
        "ultimoCierre": 104.80,
        "volumen": 75000,
        "cantidadOperaciones": 120,
        "fecha": "2023-10-28",
        "mercado": "Bolsa de Valores",
        "moneda": "ARS",
        "descripcion": "Ejemplo de instrumento financiero",
        "plazo": "Contado",
        "laminaMinima": 10.50,
        "lote": 100,
        "flashCompra": 105.00,
        "flashVenta": 107.00,
        "deleted": false
      }
    }
    ;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
