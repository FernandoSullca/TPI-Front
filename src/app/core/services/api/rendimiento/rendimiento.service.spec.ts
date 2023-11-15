import { TestBed } from '@angular/core/testing';

import { RendimientoService } from './rendimiento.service';

xdescribe('RendimientoService', () => {
  let service: RendimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
