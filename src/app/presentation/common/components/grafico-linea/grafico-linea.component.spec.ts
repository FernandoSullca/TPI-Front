import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoLineaComponent } from './grafico-linea.component';
import Chart from 'chart.js/auto';


describe('GraficoLineaComponent', () => {
  let component: GraficoLineaComponent;
  let fixture: ComponentFixture<GraficoLineaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoLineaComponent]
    });
    fixture = TestBed.createComponent(GraficoLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
