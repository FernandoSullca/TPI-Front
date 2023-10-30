import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';
import { HttpClientModule } from '@angular/common/http'; //Dependencia de RegistroService
import { of } from 'rxjs';
import { PruebitaComponent } from './pruebita.component';

describe('PruebitaComponent', () => {
  let component: PruebitaComponent;
  let fixture: ComponentFixture<PruebitaComponent>;

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
      declarations: [PruebitaComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock },
        { provide: RegistroService, useValue: registroServiceMock },
      ],

    });
    fixture = TestBed.createComponent(PruebitaComponent);
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
});
