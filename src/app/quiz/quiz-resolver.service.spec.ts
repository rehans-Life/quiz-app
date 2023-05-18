import { TestBed } from '@angular/core/testing';

import { QuizResolverService } from './quiz-resolver.service';

describe('QuizResolverService', () => {
  let service: QuizResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
