import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { PerfilInversorService } from 'src/app/core/services/api/perfil-inversor/perfil-inversor.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  //Declaracion
  let registroUsuarioServicemock: any;
  let LocalStorageServicemock: any;
  let perfilesServiciosmock: any;

  beforeEach(async () => {

    //Declaracion Simulado
    registroUsuarioServicemock = jasmine.createSpyObj('RegistroService', ['buscarUsuario']);
    LocalStorageServicemock = jasmine.createSpyObj('LocalStorageService', ['setUsuarioPerfilActualLocal', 'SetPerfilActualLocal','setPerfilSubjetivo']);
    perfilesServiciosmock = jasmine.createSpyObj('PerfilInversorService', ['obtenerPerfil']);

    let routermock: jasmine.SpyObj<Router>;
    await TestBed.configureTestingModule({
      imports: [FormsModule,RouterTestingModule ],
      declarations: [LoginComponent],
      providers: [
        { provide: RegistroService, useValue: registroUsuarioServicemock },
        { provide: LocalStorageService, useValue: LocalStorageServicemock },
        { provide: PerfilInversorService, useValue: perfilesServiciosmock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente Login', () => {
    expect(component).toBeTruthy();
  });

  // loguearme() 
  it('debe validar datos inexistentes y evitar loguearme(buscarUsuario/verfificarUsuario)', () => {
    component.usuarioForm.email = '';
    component.usuarioForm.password = 'password123';

    component.loguearme();

    expect(component.validarEntradas()).toBeFalsy();

    // También puedes verificar que ciertos métodos de tus servicios no hayan sido llamados
    expect(registroUsuarioServicemock.buscarUsuario).not.toHaveBeenCalled();

    // Configura 'component.buscarPerfilUsuario' como un espía (spy)
    spyOn(component, 'buscarPerfilUsuario');
    expect(component.buscarPerfilUsuario).not.toHaveBeenCalled();
    expect(LocalStorageServicemock.setUsuarioPerfilActualLocal).not.toHaveBeenCalled();
    expect(LocalStorageServicemock.SetPerfilActualLocal).not.toHaveBeenCalled();
  });

  it('debe devolver true si el formulario es válido', () => {
    component.usuarioForm.email = 'test@example.com';
    component.usuarioForm.password = 'password123';

    const resultado = component.validarEntradas();

    expect(resultado).toBeTruthy();
  });

  it('debe devolver false si falta el email', () => {
    component.usuarioForm.email = '';
    component.usuarioForm.password = 'password123';

    const resultado = component.validarEntradas();

    expect(resultado).toBeFalsy();
  });

  it('debe devolver false si falta la contraseña', () => {
    component.usuarioForm.email = 'test@example.com';
    component.usuarioForm.password = '';

    const resultado = component.validarEntradas();

    expect(resultado).toBeFalsy();
  });

  it('debe devolver false si faltan tanto el email como la contraseña', () => {
    component.usuarioForm.email = '';
    component.usuarioForm.password = '';

    const resultado = component.validarEntradas();

    expect(resultado).toBeFalsy();
  });

});
