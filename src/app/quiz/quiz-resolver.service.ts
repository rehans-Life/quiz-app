import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Question, QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root',
})
export class QuizResolverService {
  constructor() {}

  static resolve: ResolveFn<Question[]> = (route: ActivatedRouteSnapshot) => {
    const category = route.params['category'];
    return inject(QuizService).questions(category);
  };
}
