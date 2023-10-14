import { TestBed } from '@angular/core/testing';

import { PreguntaObjetivasService, } from './preguntaObjetiva.service';

describe('PreguntaService', () => {
  let service: PreguntaObjetivasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntaObjetivasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
