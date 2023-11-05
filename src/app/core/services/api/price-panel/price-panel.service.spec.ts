// import { HttpClient } from '@angular/common/http';
// import { environment } from 'environments/environment';
import axios from 'axios';
import { TestBed } from '@angular/core/testing';
import { PricePanelService } from './price-panel.service';
import { obtenerTitulosMock, capturarOrdenMock } from './price-panel.service.spec.helper';
import { mockAcciones } from 'src/app/core/services/api/price-panel/mock'
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
describe('PricePanelService', () => {
    let service: PricePanelService;

    beforeEach(() => {
        service = new PricePanelService();
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

        return service.obtenerTitulos()
            .then((titulos: Titulo[]) => {
                const [primer, segundo] = titulos;
                expect(titulos).toHaveSize(81);
                expect(primer.simbolo).toBe('MOCK');
                expect(segundo.simbolo).toBe('5913');
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
