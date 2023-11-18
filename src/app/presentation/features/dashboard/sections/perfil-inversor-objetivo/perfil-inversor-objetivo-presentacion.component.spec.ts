import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PerfilInversorObjetivoPresentacionComponent } from './perfil-inversor-objetivo-presentacion.component';

describe('PerfilInversorObjetivoPresentacionComponent', () => {
  let component: PerfilInversorObjetivoPresentacionComponent;
  let fixture: ComponentFixture<PerfilInversorObjetivoPresentacionComponent>;

  ///Mock
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    let localStore: any = { 
      'Perfil':'{}',
      'perfilInversor':'MODERADO'
    };

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    // Configura los spies para el Router declarado en el providers
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PerfilInversorObjetivoPresentacionComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    });
    fixture = TestBed.createComponent(PerfilInversorObjetivoPresentacionComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia navegar a  "/dashboard/perfil-inversor-cuestionario" Cuando llama a loadstage(),Empezar con el Test', () => {
    component.loadStages();

    expect(router.navigate).toHaveBeenCalledWith(['./dashboard/perfil-inversor-cuestionario']);
  });

});
