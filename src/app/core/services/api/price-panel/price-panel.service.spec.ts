// import { HttpClient } from '@angular/common/http';
// import { environment } from 'environments/environment';
import axios from 'axios';
import { TestBed } from '@angular/core/testing';
import { PricePanelService } from './price-panel.service';
import { obtenerTitulosMock, capturarOrdenMock } from './price-panel.service.spec.helper';
import { mockAcciones } from 'src/app/core/services/api/price-panel/mock'
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
import { LocalStorageService } from '../../LocalStorage/local-storage.service';
describe('PricePanelService', () => {
    let service: PricePanelService;
    let localStorageService: LocalStorageService
    beforeEach(() => {
        service = new PricePanelService(localStorageService);
    });

    const datos = Array.from(mockAcciones);
    const resolverSend = datos.map((titulo) => {
        return Titulo.serializar(titulo);
    });

    const respFuncion = new Promise<Titulo[]>((resolver, reject) => {
        return resolver(resolverSend)
    })
    const mockAxiosResponse = new Promise((resolver) => {
        return resolver({ data: mockAcciones })
    })
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should get titles', () => {
        // probar mockear axios y no funcion entera
        // spyOn(service, 'obtenerTitulos').and.returnValue(respFuncion);

        spyOn(axios, 'get').and.returnValue(mockAxiosResponse);

        return service.obtenerTitulos("acciones")
            .then((titulos: Titulo[]) => {
                const [primer, segundo] = titulos;
                expect(titulos).toHaveSize(60);
                expect(primer.simbolo).toBe('5913');
                expect(segundo.simbolo).toBe('7485');
            })


    });
    it('should obtain suggested portfolio symbol', () => {
        const symbol = 'AAPL'; // Reemplaza esto con el símbolo deseado
        service.setearSimboloDePortafolioSugerido(symbol);
      
        service.obtenerSimboloDePortafolioSugerido().subscribe((obtainedSymbol) => {
          expect(obtainedSymbol).toEqual(symbol);
        });
      });
      
});
