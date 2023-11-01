import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { PerfilSubjetivoComponent } from './perfil-subjetivo.component';
import { Router } from '@angular/router';

describe('PerfilSubjetivoComponent', () => {
  let component: PerfilSubjetivoComponent;
  let fixture: ComponentFixture<PerfilSubjetivoComponent>;
  let router:Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PerfilSubjetivoComponent]
    });
    fixture = TestBed.createComponent(PerfilSubjetivoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Prueba Simple
  /**Deberia Navegar a /perfil-inversor: 
   * Prueba que la función loadStages navegue al destino esperado /perfil-inversor
   *  utilizando un espía en el método navigate del servicio Router.*/
  it('Deberia Navegar a /perfil-inversor', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.loadStages();
    expect(navigateSpy).toHaveBeenCalledWith(['/perfil-inversor']);
  });

});
