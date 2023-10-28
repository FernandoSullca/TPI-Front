import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoVelasComponent } from './grafico-velas.component';

xdescribe('GraficoVelasComponent', () => {
  let component: GraficoVelasComponent;
  let fixture: ComponentFixture<GraficoVelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoVelasComponent]
    });
    fixture = TestBed.createComponent(GraficoVelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
