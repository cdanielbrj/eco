import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appFormatHora]'
})
export class FormatHoraDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formatHora(initialValue);
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  formatHora(value: string): string {
    let formatedValue = value.replace(/\D/g, '');
    if (formatedValue.length > 2) {
      formatedValue = formatedValue.slice(0, 2) + ':' + formatedValue.slice(2);
    }
    return formatedValue;
  }
}
