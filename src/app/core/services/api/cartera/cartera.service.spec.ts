import { TestBed } from '@angular/core/testing';

import { CarteraService } from './cartera.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CarteraService', () => {
  let service: CarteraService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CarteraService]
    });
    service = TestBed.inject(CarteraService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
