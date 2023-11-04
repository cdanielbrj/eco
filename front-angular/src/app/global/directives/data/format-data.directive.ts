import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appFormatData]'
})
export class FormatDataDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formatData(initialValue);
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  formatData(value: string): string {
    let formatedValue = value.replace(/\D/g, '');
    if (formatedValue.length > 2) {
      formatedValue = formatedValue.slice(0, 2) + '/' + formatedValue.slice(2);
    }
    if (formatedValue.length > 5) {
      formatedValue = formatedValue.slice(0, 5) + '/' + formatedValue.slice(5);
    }
    return formatedValue;
  }
}
