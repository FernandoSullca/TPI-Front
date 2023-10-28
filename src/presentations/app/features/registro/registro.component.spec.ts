import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioAPI } from 'src/core/models/API/Usuario-API.model';
import { LocalStorageService } from 'src/core/services/LocalStorage/local-storage.service'; 
import { RegistroService } from 'src/core/services/api/autorizacion/registro.service'; 
import { HttpClientModule } from '@angular/common/http'; //Dependencia de RegistroService
import { of } from 'rxjs';


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
      imports: [RouterTestingModule, HttpClientModule],
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
  it('test true', () => {
    expect(true).toBeTruthy();
  });
});
