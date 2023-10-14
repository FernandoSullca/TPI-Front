import { TestBed } from '@angular/core/testing';

import { PreguntaSubjetivasService } from './preguntaSubjetiva.service';

describe('QuestionsProfileService', () => {
  let service: PreguntaSubjetivasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntaSubjetivasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
