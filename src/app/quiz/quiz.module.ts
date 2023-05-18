import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { CheckDirective } from './check.directive';

@NgModule({
  declarations: [QuizComponent, QuestionComponent, CheckDirective],
  imports: [CommonModule, QuizRoutingModule, HttpClientModule],
})
export class QuizModule {}
