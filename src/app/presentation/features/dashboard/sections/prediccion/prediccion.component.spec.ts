import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrediccionComponent } from './prediccion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('PrediccionComponent', () => {
  let component: PrediccionComponent;
  let fixture: ComponentFixture<PrediccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrediccionComponent],
      imports: [HttpClientTestingModule]
    
    });
    fixture = TestBed.createComponent(PrediccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
