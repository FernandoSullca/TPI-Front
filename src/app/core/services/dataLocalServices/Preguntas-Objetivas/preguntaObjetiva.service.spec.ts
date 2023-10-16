import { TestBed } from '@angular/core/testing';

import { PreguntaObjetivasService, } from './preguntaObjetiva.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PreguntaObjetivaService', () => {
  let service: PreguntaObjetivasService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PreguntaObjetivasService]
    });
    service = TestBed.inject(PreguntaObjetivasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
