import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { QuestionsProfileService } from './questions-profile.service';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
