import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, Observable, BehaviorSubject } from 'rxjs';
import { Question, QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questions!: Question[];
  answers: string[] = new Array(5).fill('');
  showAnswers!: BehaviorSubject<boolean>;
  correctAnswers: number | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private quiz: QuizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.showAnswers = this.quiz.checkSub;
    this.quiz.answersObs.subscribe((answers) => {
      this.answers = answers;
    });
    this.questions = this.route.snapshot.data['questions'];
  }

  newQuestions() {
    this.route.params
      .pipe(
        map(({ category }) => category),
        switchMap((category) => this.quiz.questions(category))
      )
      .subscribe((questions) => {
        this.questions = questions;
      });
    this.showAnswers.next(false);
    this.correctAnswers = undefined;
  }

  newCategory() {
    this.router.navigateByUrl('/categories');
    this.showAnswers.next(false);
    this.correctAnswers = undefined;
  }

  checkAnswer() {
    this.quiz.checkAnswer();
    this.correctAnswers = this.quiz.correctAnswers(
      this.questions,
      this.answers
    );
  }

  setAnswer(answer: string, index: number) {
    this.quiz.answersSub.next({
      index,
      answer,
    });
  }
}
