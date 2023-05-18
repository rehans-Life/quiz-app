import { Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Category, QuizService } from './quiz/quiz.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolveService {
  constructor() {}

  static resolve: ResolveFn<Category[]> = () => {
    return inject(QuizService).categories();
  };
}
