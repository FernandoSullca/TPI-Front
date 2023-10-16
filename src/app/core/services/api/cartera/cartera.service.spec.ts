import { CarteraService } from './cartera.service';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { of, throwError } from 'rxjs';
import { Cartera } from 'src/app/core/models/cartera/cartera';
import { mockCarteraData } from './mockCartera';
import { TestBed } from '@angular/core/testing';

describe('CarteraService', () => {
  let service: CarteraService;
  let httpClientSpy: { get: jasmine.Spy };
  let handleErrorService: HandleErrorApiService;
  const datos = mockCarteraData;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    handleErrorService = TestBed.inject(HandleErrorApiService);
    service = new CarteraService(httpClientSpy as any, handleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verify response', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(datos));
    service.getCartera()
      .subscribe((resultado: Cartera) => {
        expect(resultado).toEqual(datos);
        expect(resultado.totalCartera).toEqual(55);
        expect(resultado.cantidadPorInstrumento[0].simbolo).toEqual("MOCK");
        done();
      });
  });
  it('Verify response', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(throwError({ status: 404, statusText: 'Not Found' }));
  
    service.getCartera()
      .subscribe(
        (resultado: Cartera) => {
          done.fail('Se esperaba un error, pero la suscripción se completó sin errores.');
        },
        (error) => {
          expect(error).toBeTruthy();
          done();
        }
      );
  });
});
