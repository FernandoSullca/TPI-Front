import { ComponentFixture, TestBed } from '@angular/core/testing';


import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { StageResultComponent } from './stage-result.component';

describe('StageResultComponent', () => {
  let component: StageResultComponent;
  let fixture: ComponentFixture<StageResultComponent>;

  ///Mock
  let router: jasmine.SpyObj<Router>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {

     // Configura los spies para el Router y el servicio LocalStorageService
     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
     const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItem']);
 
    TestBed.configureTestingModule({
      declarations: [StageResultComponent],
      //Provider de servicios para mockear
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(StageResultComponent);
    component = fixture.componentInstance;
    ///injeccion de los mock
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar el valor del localStorage y setear el dato en valorRecibido', () => {
    const storedProfile = { perfil: 'Moderado' };
    localStorageService.getItem.and.returnValue(storedProfile);

    component.ngOnInit();

    expect(localStorageService.getItem).toHaveBeenCalledWith('perfil');
    expect(component.valorRecibido).toEqual(storedProfile);
  });

  //Navegavilidad
  it('deberia navegar a "./dashboard/perfil-inversor-questions" Cuando llama a loadStages()"Cargar Etapas"', () => {
    component.loadStages();

    expect(router.navigate).toHaveBeenCalledWith(['./dashboard/perfil-inversor-questions']);
  });

  it('eberia navegar a  "/dashboard/precios" Cuando llama a loadHome(),por defecto, panel de precios ', () => {
    component.loadHome();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/precios']);
  });

});
