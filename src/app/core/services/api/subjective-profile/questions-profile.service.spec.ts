import { TestBed } from '@angular/core/testing';

import { QuestionsProfileService } from './questions-profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuestionsProfileService', () => {
  let service: QuestionsProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionsProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
