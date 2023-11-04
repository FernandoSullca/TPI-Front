import { TestBed } from '@angular/core/testing';

import { PortfolioSugeridoService } from './portfolio-sugerido.service';

xdescribe('PortfolioSugeridoService', () => {
  let service: PortfolioSugeridoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioSugeridoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
