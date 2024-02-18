import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(items: any, attr: any): any {
    if (!items) {
      return '';
    }

    return items.reduce((a, b) => a + b[attr], 0);
  }
}