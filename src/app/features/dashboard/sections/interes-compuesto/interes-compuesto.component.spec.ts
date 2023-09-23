import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresCompuestoComponent } from './interes-compuesto.component';

describe('InteresCompuestoComponent', () => {
  let component: InteresCompuestoComponent;
  let fixture: ComponentFixture<InteresCompuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteresCompuestoComponent]
    });
    fixture = TestBed.createComponent(InteresCompuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
