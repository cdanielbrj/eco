import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautyContato'
})
export class BeautyContatoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    let text = value.replace(/\D/g, '');

    if (text.length === 11) {
      return `(${text.substr(0, 2)})${text.substr(2, 5)}-${text.substr(7, 4)}`;
    }

    return value;
  }

}
