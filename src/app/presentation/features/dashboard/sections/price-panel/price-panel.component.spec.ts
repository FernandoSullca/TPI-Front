import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PricePanelComponent } from "./price-panel.component";
import { Router } from "@angular/router";
import { PricePanelService } from "src/app/core/services/api/price-panel/price-panel.service";
import { mockAcciones } from "src/app/core/services/api/price-panel/mock";
import { MessageComponent } from "src/app/presentation/common/components/message/message.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { Titulo } from "src/app/core/models/price-panel/titulo.model";
import { By } from "@angular/platform-browser";
import { FormatoValorPipe } from "src/app/presentation/common/pipes/formato-valor/formato-valor.pipe";
import { CarteraService } from "src/app/core/services/api/cartera/cartera.service";
import { Observable, of } from "rxjs";
import { Cartera } from "src/app/core/models/cartera/cartera";

describe('PricePanelComponent', () => {
  let component: PricePanelComponent;
  let service: PricePanelService;
  // let ngbModal : NgbModal;
  let pricePanelServiceMocked;
  let fixture: ComponentFixture<PricePanelComponent>;
  const pricePanelServiceStub = {
    obtenerTitulos: () => {
      return new Promise((resolver) => {
        const datos = Array.from(mockAcciones);
        const resolverSend = datos.map((titulo) => {
          return Titulo.serializar(titulo);
        });
        return resolver(resolverSend)
      })
    },
    capturarOrden: () => {
      return new Promise((resolver) => {
        return resolver({})
      })
    },
    getSimbolosEnMemoria: () => "texto",

    setearSimboloDePortafolioSugerido: ()=> '',

    obtenerSimboloDePortafolioSugerido: ()=>new Observable<string>
  }
  const carteraServiceStub = {
    getCartera: () => {
      return new Observable<Cartera>
    }
  }

  beforeEach(() => {
    service = new PricePanelService();
    pricePanelServiceMocked = jasmine.createSpyObj(['obtenerTitulos'])
    pricePanelServiceMocked.obtenerTitulos.and.returnValue(new Promise((resolver) => {
      return resolver({ data: mockAcciones })
    }));

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        HttpClientModule,
        CommonModule,
        FormsModule
      ],
      declarations: [PricePanelComponent, MessageComponent,FormatoValorPipe],
      providers: [
        { provide: PricePanelService, useValue: pricePanelServiceStub },
        { provide: NgbModal },
        { provide: Router, useValue: routerSpy },
        { provide: CarteraService, useValue: carteraServiceStub },

      ],
    }).compileComponents()
    fixture = TestBed.createComponent(PricePanelComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PricePanelService);
    // router = TestBed.inject(Router) as jasmine.SpyObj<Router>
    fixture.detectChanges();
  });
  
  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should show loading and then show titulos', async () => {
    component.ngOnInit();
    const loading = fixture.debugElement.query(By.css(".container-loading h3"))
    
    expect(loading.nativeElement.innerText).toBe('Cargando panel de precios ...');
    await component.getTitulos();
    expect(component.titulos).toHaveSize(81);
    expect(component).toBeTruthy();
  });

  it('should show error - try vender', () => {
    component.ngOnInit();
    const buttonsPanel = fixture.debugElement.queryAll(By.css("button"));
    const buttonVender = buttonsPanel.find((button) => {
      return button.nativeElement.innerText === "VENDER"
    })

    buttonVender?.nativeElement.click()
    expect(component.textMessage).toBe("Debes ingresar datos validos");
    expect(component.typeMessage).toBe("error");
    expect(component).toBeTruthy();
  });
  it('should show error - try comprar', () => {

    component.ngOnInit();
    const buttonsPanel = fixture.debugElement.queryAll(By.css("button"));

    const buttonComprar = buttonsPanel.find((button) => {
      return button.nativeElement.innerText === "COMPRAR"
    })

    buttonComprar?.nativeElement.click()
    expect(component.textMessage).toBe("Debes ingresar datos validos");
    expect(component.typeMessage).toBe("error");
    expect(component).toBeTruthy();
  });

  it('should show success - try comprar', async() => {

    component.ngOnInit();
    const buttonsPanel = fixture.debugElement.queryAll(By.css("button"));
    const buttonComprar = buttonsPanel.find((button) => {
      return button.nativeElement.innerText === "COMPRAR"
    })
    const datos = Array.from(mockAcciones);
    const resolverSend = datos.map((titulo) => {
      return Titulo.serializar(titulo);
    });

    component.titulos = resolverSend;
    component.simbolo = "MOCK";
    component.cantidad = 5;
    await buttonComprar?.nativeElement.click()
    
    expect(component.textMessage).toBe("Operacion realizada");
    expect(component.typeMessage).toBe("success");
    expect(component).toBeTruthy();
  });


});