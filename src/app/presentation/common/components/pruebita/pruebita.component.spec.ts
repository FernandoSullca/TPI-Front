import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebitaComponent } from './pruebita.component';

describe('PruebitaComponent', () => {
  let component: PruebitaComponent;
  let fixture: ComponentFixture<PruebitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PruebitaComponent]
    });
    fixture = TestBed.createComponent(PruebitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
