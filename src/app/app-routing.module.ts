import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryResolveService } from './category-resolve.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'categories',
    component: CategoriesComponent,
    resolve: {
      categories: CategoryResolveService.resolve,
    },
  },
  {
    path: 'quiz',
    loadChildren: () => {
      return import('./quiz/quiz.module').then((mod) => {
        return mod.QuizModule;
      });
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
