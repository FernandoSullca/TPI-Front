import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSubjetivoComponent } from './perfil-subjetivo.component';

describe('PerfilSubjetivoComponent', () => {
  let component: PerfilSubjetivoComponent;
  let fixture: ComponentFixture<PerfilSubjetivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilSubjetivoComponent]
    });
    fixture = TestBed.createComponent(PerfilSubjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
