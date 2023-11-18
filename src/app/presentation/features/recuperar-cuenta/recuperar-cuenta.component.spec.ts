import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarCuentaComponent } from './recuperar-cuenta.component';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

xdescribe('RecuperarCuentaComponent', () => {
  let component: RecuperarCuentaComponent;
  let fixture: ComponentFixture<RecuperarCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarCuentaComponent],
      providers: [RegistroService, ActivatedRoute]
    });
    fixture = TestBed.createComponent(RecuperarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
