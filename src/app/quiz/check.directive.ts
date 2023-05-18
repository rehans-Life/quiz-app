import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCheck]',
})
export class CheckDirective {
  @Input('appCheck') apply = false;
  @Input() answer = '';
  @Input() correct_answer = '';

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.pointerEvents = 'auto';
  }

  ngOnChanges() {
    const option = this.el.nativeElement.innerText;
    if (this.apply) {
      this.el.nativeElement.style.pointerEvents = 'none';
      if (option === this.answer && option !== this.correct_answer) {
        this.el.nativeElement.style.opacity = 0.5;
        this.el.nativeElement.style.backgroundColor = '#F8BCBC';
      } else if (option === this.correct_answer) {
        this.el.nativeElement.style.backgroundColor = '#94D7A2';
      } else {
        this.el.nativeElement.style.opacity = 0.5;
      }
    }
  }
}
