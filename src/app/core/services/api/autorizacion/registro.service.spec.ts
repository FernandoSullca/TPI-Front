import { TestBed } from '@angular/core/testing';

import { RegistroService } from './registro.service';

describe('RegistroService', () => {
  let service: RegistroService;

  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new RegistroService(httpClientSpy as any);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
