import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { PortfolioSugeridoService } from './portfolio-sugerido.service';

describe('PortfolioSugeridoService', () => {
  let service: PortfolioSugeridoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(PortfolioSugeridoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
