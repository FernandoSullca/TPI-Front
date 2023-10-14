import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { PreguntaSubjetivasService } from './preguntaSubjetiva.service';

describe('PreguntaSubjetivaService', () => {
  let service: PreguntaSubjetivasService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PreguntaSubjetivasService]
    });
    service = TestBed.inject(PreguntaSubjetivasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
