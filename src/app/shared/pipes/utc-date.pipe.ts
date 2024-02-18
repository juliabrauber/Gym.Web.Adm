import { 
    Pipe, 
    PipeTransform
} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'utcDate' })
export class UtcDatePipe implements PipeTransform {
    transform(value: string, format: string): string {
        if (value) {
            return moment.utc(value).format(format);
        }

        return value;
    }
}