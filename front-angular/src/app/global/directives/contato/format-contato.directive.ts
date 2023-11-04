import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appFormatContato]'
})
export class FormatContatoDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formatContato(initialValue);
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  private formatContato(value: string): string {
    // Remove caracteres não numéricos e limita a 11 dígitos
    const cleanValue = value.replace(/\D/g, '').slice(0, 11);
    const length = cleanValue.length;

    if (length === 0) {
      return ''; // Permite que o valor seja completamente apagado
    }

    if (length <= 10) { // Números até 10 dígitos (XX)XXXX-XXXX
      if (length <= 2) {
        return `(${cleanValue}`;
      } else if (length <= 6) {
        return `(${cleanValue.slice(0, 2)})${cleanValue.slice(2)}`;
      } else {
        return `(${cleanValue.slice(0, 2)})${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`;
      }
    } else { // Números com 11 dígitos (XX)XXXXX-XXXX
      if (length <= 2) {
        return `(${cleanValue}`;
      } else if (length <= 7) {
        return `(${cleanValue.slice(0, 2)})${cleanValue.slice(2)}`;
      } else {
        return `(${cleanValue.slice(0, 2)})${cleanValue.slice(2, 7)}-${cleanValue.slice(7)}`;
      }
    }
  }
}
