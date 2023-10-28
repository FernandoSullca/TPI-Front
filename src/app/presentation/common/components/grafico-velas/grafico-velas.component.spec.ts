import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoVelasComponent } from './grafico-velas.component';
import { FormatoValorPipe } from '../../pipes/pipe-formato-valor/formato-valor.pipe';

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
    expect(component).toBeTruthy();
  });
});
