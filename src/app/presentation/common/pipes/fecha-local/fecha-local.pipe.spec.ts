import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FechaLocalPipe } from './fecha-local.pipe';

describe('FechaLocalPipe', () => {
  it('create an instance', () => {
    TestBed.configureTestingModule({
      providers: [DatePipe], // Agrega DatePipe a los providers del módulo de prueba
    });
    const datePipe = TestBed.inject(DatePipe); // Obtén una instancia de DatePipe desde el TestBed
    const pipe = new FechaLocalPipe(datePipe);
    expect(pipe).toBeTruthy();
  });
});