import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResolverService } from './quiz-resolver.service';

const routes: Routes = [
  {
    path: ':category',
    component: QuizComponent,
    resolve: {
      questions: QuizResolverService.resolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
