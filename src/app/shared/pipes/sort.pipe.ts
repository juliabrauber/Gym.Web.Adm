import {
    Pipe,
    PipeTransform
} from '@angular/core';

import underscore from 'underscore';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform(arrObj: any, property: string, typeNumber: boolean = false, asc: boolean = true): any {
        var items = underscore.sortBy(arrObj, function (o) {
            return typeNumber ? parseInt(o[property], 10) : o[property];
        });

        return asc ? items : items.reverse();
    }
}
