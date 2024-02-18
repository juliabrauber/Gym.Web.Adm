import { 
    Pipe, 
    PipeTransform 
} from '@angular/core';

@Pipe({name: 'cpfCnpj'})
export class CpfCnpjPipe implements PipeTransform {
    transform(value: string): string {
        if (value) {
            if (value.length === 11) {
                return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
            } else {
                return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`;
            }
        }

        return value;
    }
}
