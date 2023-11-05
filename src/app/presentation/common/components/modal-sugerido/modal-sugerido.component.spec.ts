import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSugeridoComponent } from './modal-sugerido.component';

xdescribe('ModalSugeridoComponent', () => {
  let component: ModalSugeridoComponent;
  let fixture: ComponentFixture<ModalSugeridoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSugeridoComponent]
    });
    fixture = TestBed.createComponent(ModalSugeridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
