import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendimientoComponent } from './rendimiento.component';
import { FormatoValorPipe } from 'src/app/presentation/common/pipes/formato-valor/formato-valor.pipe';
import { MessageComponent } from 'src/app/presentation/common/components/message/message.component';

describe('RendimientoComponent', () => {
  let component: RendimientoComponent;
  let fixture: ComponentFixture<RendimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendimientoComponent,FormatoValorPipe,MessageComponent]
    });
    fixture = TestBed.createComponent(RendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
