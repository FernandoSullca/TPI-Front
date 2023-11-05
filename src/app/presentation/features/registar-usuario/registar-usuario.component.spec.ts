import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarUsuarioComponent } from './registar-usuario.component';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegistarUsuarioComponent', () => {

  let component: RegistarUsuarioComponent;
  let fixture: ComponentFixture<RegistarUsuarioComponent>;

  let registroUsuarioServicemock: any;

  beforeEach(() => {

    registroUsuarioServicemock = jasmine.createSpyObj('RegistroService', ['buscarUsuario', 'registrarNuevoUsuario']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [RegistarUsuarioComponent],
      providers: [
        { provide: RegistroService, useValue: registroUsuarioServicemock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // registrarUsuario()

  it('debe evitar registro usuario si los campos No son validos', () => {
    component.usuarioForm = {
      username: '',
      name: 'testname',
      lastname: 'testlastname',
      email: 'test@email',
      password: ''
    };

    const response = {};
    registroUsuarioServicemock.registrarNuevoUsuario.and.returnValue(of(response));

    component.registrarUsuario();

    expect(registroUsuarioServicemock.registrarNuevoUsuario).not.toHaveBeenCalled();
    expect(component.registro).toBeFalsy();

  });

  it('debe registrar usuario si los campos son validos', () => {
    component.usuarioForm = {
      username: 'testusername',
      name: 'testname',
      lastname: 'testlastname',
      email: 'test@email',
      password: 'testpass'
    };
    const response = {};
    registroUsuarioServicemock.registrarNuevoUsuario.and.returnValue(of(response));


    component.registrarUsuario();

    expect(registroUsuarioServicemock.registrarNuevoUsuario).toHaveBeenCalled();
    expect(component.registro).toBeTruthy();
  });

  it('debe informar que no es posible registrar si los campos son validos', () => {
    component.usuarioForm = {
      username: 'testusername',
      name: 'testname',
      lastname: 'testlastname',
      email: 'test@email',
      password: 'testpass'
    };

    const error = new Error('Error al registrar el usuario');
    registroUsuarioServicemock.registrarNuevoUsuario.and.returnValue(throwError(error));


    component.registrarUsuario();

    expect(registroUsuarioServicemock.registrarNuevoUsuario).toHaveBeenCalled();
    expect(component.registro).toBeFalsy();
    expect(component.errorReg).toBeTruthy();

  });

  // validarCampos()
  it('debe devolver false si faltan tanto el email como la contraseña', () => {

    component.usuarioForm = {
      username: 'testusername',
      name: 'testname',
      lastname: 'testlastname',
      email: '',
      password: ''
    };
    const resultado = component.validarCampos();

    expect(resultado).toBeFalsy();

  });

  it('debe devolver true si el formulario esta completo', () => {
    component.usuarioForm = {
      username: 'testusername',
      name: 'testname',
      lastname: 'testlastname',
      email: 'test@email',
      password: 'testpass'
    };
    const resultado = component.validarCampos();

    expect(resultado).toBeTruthy();

  });
});
