import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { QuestionsProfileService } from './questions-profile.service';
import { environment } from 'src/environments/environment';

import axios from 'axios';
// import nock  from 'nock';
describe('QuestionsProfileService', () => {
  let service: QuestionsProfileService;
  let httpTestingController: HttpTestingController;

  beforeEach((
    ) => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[QuestionsProfileService]
    });
    service = TestBed.inject(QuestionsProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

//Limpiezas de Solicitudes
//En el bloque afterEach, llamamos a httpTestingController.verify() 
//para asegurarnos de que no haya solicitudes pendientes sin responder y limpiar las expectativas
afterEach(() => {
  httpTestingController.verify();
});


it('should be created', () => {
    expect(service).toBeTruthy();
  });

});