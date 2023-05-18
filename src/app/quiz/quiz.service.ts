import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  switchMap,
  of,
  filter,
  toArray,
  scan,
  Subject,
  BehaviorSubject,
} from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
  question: string;
}

interface CategoriesResponse {
  trivia_categories: Category[];
}

interface QuizResponse {
  results: Question[];
}

export interface Answer {
  index: number;
  answer: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  url = 'https://opentdb.com';
  amount = 5;
  type = 'multiple';

  // A subject which is going to emit an event whenever the user selects
  // an answer for a question.
  answersSub: Subject<Answer> = new Subject();
  answersObs: Observable<string[]>;

  // A behavior subject which is going to emit a boolean which is going
  // to determine weather we should display the correct and incorrect
  // answers or not.
  checkSub: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    // This observable is going to mimic the events that the subject
    // emits and it basically sets the answer for the question that
    // the user has clicked on and it returns an array containing the
    // answers that the user has selected.
    this.answersObs = this.answersSub.pipe(
      scan((acc: string[], ans: Answer) => {
        let copyAcc = acc.slice();
        copyAcc[ans.index] = ans.answer;
        return copyAcc;
      }, new Array(5).fill(''))
    );
  }

  correctAnswers(questions: Question[], answers: string[]) {
    return answers.reduce((acc, curr, index) => {
      if (curr === questions[index].correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  checkAnswer() {
    this.checkSub.next(true);
  }

  categories() {
    return this.http
      .get<CategoriesResponse>(`${this.url}/api_category.php`)
      .pipe(
        map((res) => res.trivia_categories),
        switchMap((categories) => of(...categories)),
        filter((category) => !(category.id % 4)),
        toArray()
      );
  }

  randomize(options: string[]): string[] {
    const correctRandom = Math.floor(Math.random() * options.length);
    [options[options.length - 1], options[correctRandom]] = [
      options[correctRandom],
      options[options.length - 1],
    ];
    return options;
  }

  questions(id: number) {
    const params = new HttpParams()
      .set('amount', this.amount)
      .set('category', id)
      .set('type', this.type);
    return this.http.get<QuizResponse>(`${this.url}/api.php`, { params }).pipe(
      map((res) => res.results),
      switchMap((results) => of(...results)),
      map((question) => ({
        ...question,
        options: this.randomize([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      })),
      toArray()
    );
  }
}
