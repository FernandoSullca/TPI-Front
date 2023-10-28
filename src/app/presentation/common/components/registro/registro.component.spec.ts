import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { Router } from '@angular/router';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';

import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  let router: Router;
  let localStorageService: LocalStorageService;
  let registroService: RegistroService;


  beforeEach(() => {
    
    
  // Mock de los servicios y Router
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', ['setItem', 'setUsuarioPerfilActualLocal', 'SetPerfilActualLocal']);
  const registroServiceMock = jasmine.createSpyObj('RegistroService', ['registrarUsuario', 'buscarUsuario']);

    TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock },
        { provide: RegistroService, useValue: registroServiceMock },
      ],
    });
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
       // Inicializa los servicios y Router
       router = TestBed.inject(Router);
       localStorageService = TestBed.inject(LocalStorageService);
       registroService = TestBed.inject(RegistroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.usuarioForm.username).toEqual('');
    expect(component.usuarioForm.name).toEqual('');
    expect(component.usuarioForm.lastname).toEqual('');
    expect(component.errorReg).toBeFalsy();
  });


});
