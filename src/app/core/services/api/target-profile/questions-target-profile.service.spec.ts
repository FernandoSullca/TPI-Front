import { TestBed } from '@angular/core/testing';

import { QuestionsTargetService} from './questions-target-profile.service'

describe('PreguntaService', () => {
  let service:QuestionsTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
