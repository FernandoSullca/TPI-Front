import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing'; 
import { BehaviorSubject, of } from 'rxjs';
import { ActivarCuentaComponent } from './activar-cuenta.component';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('ActivarCuentaComponent', () => {
  let component: ActivarCuentaComponent;
  let fixture: ComponentFixture<ActivarCuentaComponent>;

  let registroUsuarioServicemock: any
  let activatedRouteMock: any
  beforeEach(() => {

    registroUsuarioServicemock = jasmine.createSpyObj('RegistroService', ['buscarUsuario', 'registrarNuevoUsuario','ActivarConToken']);

    activatedRouteMock = {
      snapshot: {
        queryParams: { token: 'token_de_prueba' },
      },
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule] ,
      declarations: [ActivarCuentaComponent],
      providers: [
        { provide: RegistroService, useValue: registroUsuarioServicemock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivarCuentaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create con ngoninit', () => {
    // Configura el servicio mock para devolver un observable de null
    registroUsuarioServicemock.ActivarConToken.and.returnValue(of(null));
  
    fixture.detectChanges(); // Ejecutar detección de cambios
  
    expect(component).toBeTruthy();
  });
  
  it('should create Token', () => { 
    registroUsuarioServicemock.ActivarConToken.and.returnValue(of(null));
    fixture.detectChanges(); // Ejecutar detección de cambios
    expect(component).toBeTruthy();
    expect(component.token).toBe('token_de_prueba');
  });
});
