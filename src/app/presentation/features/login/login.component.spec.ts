import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { PerfilInversorService } from 'src/app/core/services/api/perfil-inversor/perfil-inversor.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { RegistroService } from 'src/app/core/services/api/autorizacion/registro.service';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const registroUsuarioServicemock = {
      // Define aquí tus métodos simulados
      // Por ejemplo:
   
    };
    const LocalStorageServicemock = {
      // Define aquí tus métodos simulados
      // Por ejemplo:
   
    };
    const perfilesServiciosmock = {
      // Define aquí tus métodos simulados
      // Por ejemplo:
   
    };
    let routermock: jasmine.SpyObj<Router>;
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[  
        { provide: RegistroService, useValue: registroUsuarioServicemock },
        { provide: LocalStorageService, useValue: LocalStorageServicemock },
        { provide: PerfilInversorService, useValue: perfilesServiciosmock },
        { provide: Router, useValue: routermock }, ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
