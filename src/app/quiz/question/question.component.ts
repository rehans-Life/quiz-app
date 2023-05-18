import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() question = '';
  @Input() options: string[] = [];
  @Input() answer = '';
  @Input() correct_answer = '';
  @Output() selectedAnswer = new EventEmitter();
  showAnswer: boolean = false;

  constructor(private quiz: QuizService) {
    this.quiz.checkSub.subscribe((bool) => {
      this.showAnswer = bool;
    });
  }

  onSelect(option: string) {
    this.selectedAnswer.emit(option);
  }
}
