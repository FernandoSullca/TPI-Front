import { TestBed } from '@angular/core/testing';

import { QuestionsProfileService } from './questions-profile.service';

describe('QuestionsProfileService', () => {
  let service: QuestionsProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
