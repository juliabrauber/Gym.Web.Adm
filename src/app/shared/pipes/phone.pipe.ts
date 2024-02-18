import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
    transform(value: string, international: boolean = false): string {
        if(!value) {
            return value;
        }

        if (!international && value.startsWith('55')) {
            international = true;
        }

        if (value) {
            if (!international) {
                if (value.length === 10) {
                    return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
                }
                else {
                    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            else {
                if (value.length === 12) {
                    return `+${value.slice(0, 2)} (${value.slice(2, 4)}) ${value.slice(4, 8)}-${value.slice(8, 12)}`;
                }
                else {
                    return `+${value.slice(0, 2)} (${value.slice(2, 4)}) ${value.slice(4, 9)}-${value.slice(9, 13)}`;
                }
            }
        }

        return value;
    }
}