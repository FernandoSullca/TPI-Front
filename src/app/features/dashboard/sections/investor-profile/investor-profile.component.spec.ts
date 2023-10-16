import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { InvestorProfileComponent } from './investor-profile.component';

describe('InvestorProfileComponent', () => {
  let component: InvestorProfileComponent;
  let fixture: ComponentFixture<InvestorProfileComponent>;

   ///Mock
   let router: jasmine.SpyObj<Router>;
  beforeEach(() => {

     // Configura los spies para el Router declarado en el providers
     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [InvestorProfileComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    });
    fixture = TestBed.createComponent(InvestorProfileComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia navegar a  "/dashboard/perfil-inversor-questions" Cuando llama a loadstage(),Empezar con el Test', () => {
    component.loadStages();

    expect(router.navigate).toHaveBeenCalledWith(['./dashboard/perfil-inversor-questions']);
  });

});
