import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RendimientoComponent } from './rendimiento.component';
import { MessageComponent } from 'src/app/presentation/common/components/message/message.component';
import { PorcentajeValorCustomizadoPipe } from 'src/app/presentation/common/pipes/porcentaje-valor-customizado/porcentaje-valor-customizado.pipe';
import { FormatoValorPipe } from 'src/app/presentation/common/pipes/formato-valor/formato-valor.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RendimientoComponent', () => {
  let component: RendimientoComponent;
  let fixture: ComponentFixture<RendimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [RendimientoComponent,PorcentajeValorCustomizadoPipe,FormatoValorPipe,MessageComponent]
    });
    fixture = TestBed.createComponent(RendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
