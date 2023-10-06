import { TestBed } from '@angular/core/testing';

import { ValuacionTotalCarteraService } from './valuacion-total-cartera.service';

describe('ValuacionTotalCarteraService', () => {
  let service: ValuacionTotalCarteraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValuacionTotalCarteraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
